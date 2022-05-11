const app = require('../index') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)


//before all tests : open mongodb client

it('Testing to see if Jest works', () => {
    expect(1).toBe(1)
})


//after all tests : close it 