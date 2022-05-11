const app = require('../index') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

/*
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB connection string.
const uri ='YOUR-MONGODB-URI'
const client = new MongoClient(uri)

beforeAll(async () => {
  await client.connect()
})

afterAll(async () => {
  await client.close()
})

test('testing', () => {
  expect(client).toBeDefined()
})
*/

describe('Authorization and Authentication', () => {
    it('making a bad request to private screen', async() => {
        const response = await request.get("/api/private");
        expect(response.statusCode).toBe(401);
        expect(response.error).toBe("Not authorized to access this route.")
        // Testing a single element in the array

    });

    // Insert other tests below this line

    // Insert other tests above this line
});