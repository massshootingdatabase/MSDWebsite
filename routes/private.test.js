const app = require("../index"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

describe("insert", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_SERVER);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should return unauthorized request", async () => {
    const response = await request.get("/api/private");
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Not authorized to access this route");
  });

  it("should return private data", async () => {
    const admin = await Admin.findOne({ email: "superuser@gmail.com" });
    const token = admin.getSignedToken();

    const auth = "Bearer " + token;

    const response1 = await request
      .get("/api/private")
      .set("Authorization", auth);
    expect(response1.statusCode).toBe(200);
  });
});
