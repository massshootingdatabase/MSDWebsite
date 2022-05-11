const app = require('../index') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

it('Testing to see if Jest works', () => {
    expect(1).toBe(1)
})
