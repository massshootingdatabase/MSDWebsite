This folder is mainly for providing some stuff to load data onto MongoDB.
We'll have to eventually improve on some of the code in here.

Instructions
====================
1. Set up MongoDB - some stuff is written below
2. Download the CSVs containing incidents, incidents to sources, and incidents to columnsHaveTypes
3. For now, just run incidents_conversion.py. This will generate a JSON file.
4. load json commands should give you a rough idea of which commands to use with the results.
=====================


https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-mongodb
mongod --version
To run and manage your mongod process, you will be using your operating system's built-in init system. 
Recent versions of Linux tend to use systemd (which uses the systemctl command), 
while older versions of Linux tend to use System V init (which uses the service command).
If you are unsure which init system your platform uses, run the following command:

ps --no-headers -o comm 1

Then select the appropriate tab below based on the result:

systemd - select the systemd (systemctl) tab below.
init - select the System V Init (service) tab below.


For init
sudo /etc/init.d/ (WSL2)
sudo service mongod start 
status
stop
restart

You can also check the log file for the current status of the mongod process, 
located at: /var/log/mongodb/mongod.log by default. 

mongosh - 
connects to a mongod running on localhost with default port 27017 by default


mongoimport -
imports data 

mongoimport version: 100.5.0
git version: 460c7e26f65c4ce86a0b99c46a559dccaba3a07d
Go version: go1.16.3
   os: linux
   arch: amd64
   compiler: gc

-d= (database)
-c= (collection)
--fields-
--columnsHaveTypes 
--type=csv ()
--file=filename
--headerline #keeps us from importing the first line
--mode=upsert
--upsertFields=gva_id

mongoexport -
exports data


https://docs.mongodb.com/manual/core/2dsphere/

