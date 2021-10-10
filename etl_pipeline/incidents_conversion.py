import csv
import json
from typing import Dict
from collections import defaultdict

# Constants here for command line arguments...
INCIDENTS_CSV = "incidents.csv" # filepath to csv containing incidents...
INCIDENTS_TO_SOURCES = "incidents_to_sources.csv" # filepath to csv containing incidents to sources...
INCIDENTS_TO_TYPES = "incidents_to_types.csv" # filepath to csv containing incidents to types...

INCIDENTS_JSON = "incidents.json" # filepath to json that will contain incidents

def modify_keys(dct: Dict) -> Dict:
    '''Returns a dict with '$' prepended to every key in the original dict
        Ensures compliance with MongoDB's Extended JSON v2.
    '''
    keys = list(dct.keys())
    for i in keys:
        val = dct.pop(i, "")
        dct["$" + i] = val
    return dct

def process_incident(incident: Dict) -> Dict:
    '''Returns an modified Incident dict read from the CSV containing incidents
    '''
    # MongoDB supports GeoJSON Points -- has fancy indexes
    incident["location"] = {"type" : "Point", "coordinates" : [float(incident["lat"]), float(incident["long"])]}
    # convert to int
    for i in ["gva_id", "congressional", "state_senate", "state_house", "deaths", "wounded"]:
        incident[i] = int(incident[i])
    # purge keys not necessary in DB
    for i in ["lat", "long", "transferred_by", "fact_check1", "fact_check2", "fact_check3"]:
        del incident[i]
    # set up sources and types lists
    incident["sources"] = []
    incident["types"] = []
    # add $ to each key name to be compliant
    return incident

def process_source(source: Dict) -> Dict:
    '''Returns a modified Source dict read from the CSV containing sources
    '''
    # purge keys not necessary in DB
    for i in ["gva_id", "transferred_by", "fact_check1", "fact_check2", "fact_check3"]:
        del source[i]
    # add $ to each key name to be compliant
    return source

if __name__ == "__main__": 
    incidents_map = dict() # might have to change how this works depending on how much data we collect...

    # read the incidents CSV
    with open(INCIDENTS_CSV) as incidents_csv:
        incidents_reader = csv.DictReader(incidents_csv)
        for i in incidents_reader:
            gva_id = i["gva_id"]
            processed_incident = process_incident(i)
            incidents_map[gva_id] = processed_incident

    # read the incidents to sources CSV
    with open(INCIDENTS_TO_SOURCES) as incidents_to_sources_csv:
        inc_to_src_reader = csv.DictReader(incidents_to_sources_csv)
        for i in inc_to_src_reader:
            gva_id = i["gva_id"]
            source = process_source(i)
            incidents_map[gva_id]['sources'].append(source)

    # read the incidents to types CSV
    with open(INCIDENTS_TO_TYPES) as incidents_to_types_csv:
        inc_to_type_reader = csv.reader(incidents_to_types_csv)
        inc_to_type_reader.__next__() # prevents us from reading the headerline
        for i in inc_to_type_reader:
            gva_id = i[0]
            incident_type = i[1]
            incidents_map[gva_id]['types'].append(incident_type)

    # dump to JSON
    with open(INCIDENTS_JSON, mode='w') as incidents_json:
        json.dump(list(incidents_map.values()), incidents_json)