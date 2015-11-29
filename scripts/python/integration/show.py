# Just pretend this is bash... of evil! Muhahahaha!
import subprocess, os, sys

sauronHome = "jsevil"
args = []

# Get special Ogres
def getSpecialOgres():
	specialOgres = []
	for specialOgre in sys.argv:
		args.append(specialOgre)
		specialOgreHome = "jsevil/%s" % (specialOgre)
		if (os.path.isdir(specialOgreHome)):
			specialOgres.append(specialOgre)
		else:
			specialOgres.append("Ogre doesn't want to dance")
	if (len(specialOgres) < 2):
		specialOgres.append("Make them all dance")
	return specialOgres

# Summon all ogres
def summonAllOgres():
	ogres = []
	for ogre in os.listdir(sauronHome):
		ogres.append(ogre)
	return ogres

# Make ogre dance
def ogreDance(ogreName):
	expect   = "jsevil/%s/etc/diff/expect.txt" % (ogreName)
	enchant  = "";
	enchant += " printf '\x1b[3m'"
	enchant += " && echo '%s->expects:'" % (ogreName)
	enchant += " && printf '\x1b[0m'"
	enchant += " && cat %s | sed -n 's/^./\t&/p'" % (expect)
	enchant += " && echo '========================================'"
	return enchant

# Make ogres dance
def makeOgresDance(ogres, firstOgre):
	for ogre in range(firstOgre, len(ogres)):
		if (ogres[ogre] != "Ogre doesn't want to dance"):
			command = ogreDance(ogres[ogre])
		else:
			command = "echo 'bad name: %s'" % (args[ogre])
		subprocess.call(command, shell=True)

# Make decision
specialOgres = getSpecialOgres()
if (specialOgres[1] == "Make them all dance"):
	ogres = summonAllOgres()
	makeOgresDance(ogres, 0)
else:
	makeOgresDance(specialOgres, 1)

