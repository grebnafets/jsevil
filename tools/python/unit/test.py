# Just pretend this is bash... of evil! Muhahahaha!
import subprocess, os, sys

sauronHome = "jsevil"
SING_FAILURE = 1
SING_SUCCESS = 2
SING_RESULT  = 4

# Get special Ogres
def bardPrepareSongs():
	songs = []
	for song in sys.argv:
		songs.append(song)
	if (len(songs) < 2):
		songs.append("Silence!")
	return songs

def bardSing(ogreName):
	song = ""
	songs = bardPrepareSongs()
	if (songs[1] != "Silence!" and songs[1].isdigit()):
		if (int(songs[1]) & SING_FAILURE == SING_FAILURE):
			song += "__test_show_failure = true;"
		if (int(songs[1]) & SING_SUCCESS == SING_SUCCESS):
			song += "__test_show_success = true;"
		if (int(songs[1]) & SING_RESULT == SING_RESULT):
			song += "__test_show_result = true;"
	return song

# Command one ogre to fight!
def ogreFight(ogreName):
	ogreHome = "jsevil/%s" % (ogreName)
	command = ""
	if (os.path.isdir(ogreHome)):
		bardSong = bardSing(ogreName)
		command += "echo '%s' > jsevil/%s/src/unit.config.js" % (bardSong, ogreName)
		command += " && cd jsevil/%s/ && make && cd ../../" % (ogreName)
		command += " && printf '\x1b[3m'"
		command += " && echo '%s:'" % (ogreName)
		command += " && printf '\x1b[0m'"
		command += " && node jsevil/%s/bin/unit.js" % (ogreName)
		command += " | sed -n 's/^./\t&/p'"
	return command

# Command army of ogres to fight!
def commandArmyOfOgres():
	command = ""
	path = os.environ["JSEVIL_SEARCH_PATH"]
	command = "%s/tools/go/ajaxServer/ajaxServer" % (path)
	subprocess.Popen(command)
	if (len(sys.argv) > 2):
		for ogre in range(1, len(sys.argv)):
			command = ogreFight(sys.argv[ogre])
			subprocess.call(command, shell=True)
	else:
		for ogre in os.listdir(sauronHome):
			command = ogreFight(ogre)
			subprocess.call(command, shell=True)

commandArmyOfOgres()
