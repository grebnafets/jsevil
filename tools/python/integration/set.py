# Just pretend this is bash... of evil! Muhahahaha!
import subprocess, os, sys, time

sauronHome = "jsevil"
args = []

def getEliteOgres():
	eliteOgres = []
	for eliteOgre in sys.argv:
		args.append(eliteOgre)
		eliteOgreHome = "jsevil/%s" % (eliteOgre)
		if (os.path.isdir(eliteOgreHome)):
			eliteOgres.append(eliteOgre)
		else:
			eliteOgres.append("Ogre doesn't want to fight")
	if (len(eliteOgres) < 2):
		eliteOgres.append("Make them all fight")
	return eliteOgres

# Summon army of ogres!
def summonAllOgres():
	ogres = []
	for ogre in os.listdir(sauronHome):
		ogres.append(ogre)
	return ogres

# Enchant Ogres to make them stronger!
def enchantOgres(ogreName, expect):
	enchant = "";
	enchant += " && printf '\x1b[3m'"
	enchant += " && echo '%s now expects:'" % (ogreName)
	enchant += " && printf '\x1b[0m'"
	enchant += " && cat %s | sed -n 's/^./\t&/p'" % (expect)
	return enchant

# Command one ogre to fight!
def ogreFight(ogreName):
	now = time.strftime("%d-%m-%Y-%H")
	backup   = "jsevil/%s/etc/diff/expect.txt.%s.bak" % (ogreName, now)
	expect   = "jsevil/%s/etc/diff/expect.txt" % (ogreName)
	command  = "cat %s > %s" % (expect, backup)
	command += " && node jsevil/%s/bin/integration.js >" % (ogreName)
	command += expect
	command += enchantOgres(ogreName, expect)
	return command

# Command army of ogres to fight!
def commandArmyOfOgres(ogres, firstOgre):
	for ogre in range(firstOgre, len(ogres)):
		if (ogres[ogre] != "Ogre doesn't want to fight"):
			command = ogreFight(ogres[ogre])
		else:
			command = "echo 'bad name: %s'" % (args[ogre])
		subprocess.call(command, shell=True)

# Make commanding decision
eliteOgres = getEliteOgres()
if (eliteOgres[1] == "Make them all fight"):
	ogres = summonAllOgres()
	commandArmyOfOgres(ogres, 0)
else:
	commandArmyOfOgres(eliteOgres, 1)
