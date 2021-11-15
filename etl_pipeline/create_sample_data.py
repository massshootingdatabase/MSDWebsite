from csv import DictReader
from json import dump
from random import randint, choice

# This module uses data from the National Address Database
# https://www.transportation.gov/gis/national-address-database/national-address-database-0

# Change this path if you're running this on Mac OSX or Linux...
NATIONAL_ADDRESS_DB = ".\\NAD_r7_TXT\\TXT\\NAD_r7.txt" 

FIELDNAMES =[
    "gva_id",
    "incident_name",
    "date",
    "place_type",


    "address",
    "city",
    "state",
    "postal_code",
        

    "congressional",
    "state_senate",
    "state_house",

    "lat",
    "long",

    "deaths",
    "injuries"
]

PLACE_TYPES = [
    "government building",
    "place of worship",
    "office",
    "gas station",
    "nightclub",
    "bar",
    "restaurant",
    "street",
    "highway",
    "concert",
    "shopping center",
    "store",
    "park",
    "school",
    "theater",
    "residence",
    "other"
]

BATCH_SIZE = 10_000  # determines how many rows in each JSONs file
BATCHES = 20  # determines how many JSON files we'll end up making

def is_complete(row: dict) -> bool:
    '''Returns False if any of the keys has a blank string
    '''
    for field in ["Add_Number", "StreetName", "StN_PosTyp", "State", "Zip_Code", "Post_Comm", "Latitude", "Longitude"]:
            if row[field] == "":
                return False
    return True


def create_date() -> str:
    '''Outputs a UTC timestamp in ISO-8601 Format (YYYY-MM-DDTHH:MMZ)
    '''
    year = randint(1990, 2021)
    month = randint(1, 12)
    # Months do not have the same number of days
    day = 1
    if month == 2:
        day = randint(1, 28)
    elif month in [4,6,9,11]:
        day = randint(1, 30)
    else:
        day = randint(1, 31)
    # We are using 24 hour time
    hour = randint(1, 23)
    minute = randint(1, 59)
    return "{}-{:0>2}-{:0>2}T{:0>2}:{:0>2}Z".format(year, month, day, hour, minute)


def create_incident(count: int, row: dict):
    '''Create an Incident object with the current row...
    '''
    gva_id = "{:0>13}".format(count)
    date = create_date()

    # MongoDB supports GeoJSON objects such as Point for quick indexing
    # Python floats are acceptable (IEEE-754)
    # We only need at least 7 decimals of precision for 1m error at equator
    location = {
        "type": "Point", 
        "coordinates": [float(row["Latitude"]), float(row["Longitude"])]
    }

    # we typecast the values to prepare them for mongoimport
    # the values must be the types we need
    # we can't convert dates though
    return {
        "gva_id": gva_id,
        "incident_name": "",
        "date": date,

        "place_type": choice(PLACE_TYPES),
        "place_name": "",

        "address": "{} {} {}".format(row["Add_Number"], row["StreetName"], row["StN_PosTyp"]),
        "city": row["Post_Comm"],
        "state": row["State"],
        "postal_code": row["Zip_Code"],

        "congressional": str(randint(1, 50)),
        "state_senate": str(randint(1, 100)),
        "state_house": str(randint(1, 157)),

        "deaths": randint(1, 22),
        "wounded": randint(1, 30),

        "location": location,

        "sources": [],
        "types": []
    }

if __name__ == '__main__':
    # the output_file is opened with a newline="" so rows write one after another
    # without extra empty lines in between
    with open(NATIONAL_ADDRESS_DB) as address_db:
        dr = DictReader(address_db)
        total_rows = 0  # this keeps track of how many rows we processed total
        for i in range(1, BATCHES + 1):  # we add 1 since range isn't inclusive
            rows = []
            output_path = "output{}.json".format(i)
            with open(output_path, mode="w", newline="") as output:
                count = 0 # this just allows us to see the progress within an batch
                while count < BATCH_SIZE:
                    row = next(dr)
                    if is_complete(row):
                        rows.append(create_incident(total_rows, row))
                        print("File", i, "Row", count, "Total Rows:", total_rows)
                        count += 1
                        total_rows += 1
                dump(rows, output)

    
        
        

    
    
    