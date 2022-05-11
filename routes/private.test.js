const app = require('../index') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require('mongoose');

describe('insert', () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.DB_SERVER);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('making a bad request to private screen', async() => {
    const response = await request.get("/api/private");
    expect(response.statusCode).toBe(200);
    //expect(response.text.message).toBe("You got access to the private data in this route")
    // Testing a single element in the array
  });
});


