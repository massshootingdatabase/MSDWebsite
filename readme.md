# Introduction
This folder is mainly for loading data onto MongoDB.

# Instructions
## Overview
* Set up MongoDB. Note that I used Linux for most of this process.
* Decide whether you want to use test data or incident data.

## Setting up MongoDB
* Follow the MongoDB installation instructions for your operating system.
   * Ex: [Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
   * For WSL2 users, it's weird. [See this article.](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-mongodb)

## Test Data
* For the test data, download the data set from the 
  [National Address Database](https://www.transportation.gov/gis/national-address-database/national-address-database-0).
* Once you finished downloading the ZIP file, extract it.
  Change the `NATIONAL_ADDRESS_DB` in `create_sample_data.py` 
  to the filepath where `NAD_r7.txt` is located.
* Run the script. CTRL+C after you have created at least 1 JSON file.
```
// swap out upsert with --drop if needed
mongoimport --db=msd --collection=incidents --drop \
--type=json --jsonArray --file=output1.json

// allows you to quickly modify every value to date...
// make sure you're using this in mongosh
db.incidents.updateMany({},[{ "$set" : { "date" : { $toDate : "$date"}}}])
```

## Incident Data
* Download the CSVs containing incidents, incidents to sources, and incidents to columnsHaveTypes
* Run `incidents_conversion.py`. This will generate a JSON file.
```
// swap out upsert with --drop if needed
mongoimport --db=msd --collection=incidents --drop --type=json --jsonArray --file=incidents.json 

// allows you to quickly modify every value to date...
// make sure you're using this in mongosh
db.incidents.updateMany({},[{ "$set" : { "date" : { $toDate : "$date"}}}])
```


