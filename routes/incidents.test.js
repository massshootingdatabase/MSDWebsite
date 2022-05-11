

it('should insert an incident into collection', async() => {

    const dummyInc = {
            "start_date": "July 4 2021", 
            "deaths": 2, 
            "wounded": 3,
            "types": [
                "gang violence"
            ], 
            "description": "shooter drove by and shoot at a group of rival gangmembers", 
            "districts": {
                "congressional": "59B", 
                "state_senate": "6",  
                "state_house": "11"
            }, 
            "location": {
                "place_type": "residential street", 
                "coordinates" : [5, 4], 
                "address": "4562 west lincoln ave", 
                "city": "Los Angeles", 
                "state": "CA", 
                "postal_code": "90210" 
            }, 
            "sources": [
                {
                    "description": "webpage", 
                    "url": "www.wikipedia.com"
                }
            ]
    }


    const response = await request.get("/api/incident/create");


    //verify that it was created 
    expect(response.statusCode).toBe(200);
});