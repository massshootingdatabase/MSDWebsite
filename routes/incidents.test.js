const app = require("../index"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");

const Incident = require("../models/Incidents");
const Admin = require("../models/Admin");

describe("Incident insertion requests", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_SERVER);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Testing to see if Jest works", () => {
    expect(1).toBe(1);
  });

  // GET INCIDENT

  it("Gets an incident by id", async () => {
    const dummyIncident = {
      id: "624a52501c5796cf2c190b7b",
    };

    const response = await request
      .post("/api/incidents/get")
      .send(dummyIncident);
    expect(response.statusCode).toBe(200);

    const invalidIncident = {
      id: "doesnotexist",
    };

    const response1 = await request
      .post("/api/incidents/get")
      .send(invalidIncident);
    expect(response1.statusCode).toBe(401);
  });

  // CREATE INCIDENT
  it("Creates a new incident", async () => {
    const dummyInc = {
      start_date: "July 4 2021",
      deaths: 2,
      wounded: 3,
      types: ["gang violence"],
      description: "Sandy Hook Shooting",
      districts: {
        congressional: "59B",
        state_senate: "6",
        state_house: "11",
      },
      location: {
        place_type: "residential street",
        coordinates: [5, 4],
        address: "4562 west lincoln ave",
        city: "Los Angeles",
        state: "CA",
        postal_code: "90210",
      },
      sources: [
        {
          description: "webpage",
          url: "www.wikipedia.com",
        },
      ],
    };

    // testing unauthorized
    const response = await request.post("/api/incidents/create").send(dummyInc);
    expect(response.statusCode).toBe(401);

    // authorized
    const admin = await Admin.findOne({ email: "superuser@gmail.com" });
    const token = admin.getSignedToken();

    const auth = "Bearer " + token;

    const response1 = await request
      .post("/api/incidents/create")
      .send(dummyInc)
      .set("Authorization", auth);
    expect(response1.statusCode).toBe(200);

    const insertedIncident = await Incident.findOne({
      description: dummyInc.description,
    });
    expect(insertedIncident.description).toEqual(dummyInc.description);

    await Incident.deleteOne({ description: insertedIncident.description });
  });
});
