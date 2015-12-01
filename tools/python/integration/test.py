# Just pretend this is bash... of evil! Muhahahaha!
import subprocess, os

sauronHome = "jsevil"
ogres = []

# Summon army of ogres!
def summonOgres():
	for ogre in os.listdir(sauronHome):
		ogres.append(ogre)

# Command one ogre to fight!
def ogreFight(ogreName):
	result   = "jsevil/%s/etc/diff/result.txt" % (ogreName)
	expect   = "jsevil/%s/etc/diff/expect.txt" % (ogreName)
	command  = "node jsevil/%s/bin/integration.js >" % (ogreName)
	command += result
	command += " && diff %s %s" % (expect, result)
	return command

# Command army of ogres to fight!
def commandArmyOfOgres():
	summonOgres()
	for ogre in ogres:
		command = ogreFight(ogre)
		subprocess.call(command, shell=True)

commandArmyOfOgres()
