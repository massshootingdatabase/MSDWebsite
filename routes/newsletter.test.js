const app = require("../index"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);

describe("Newsletter", () => {
  it("send a signup email to msdb", async () => {
    const dummySubscriber = {
      firstname: "dummy",
      lastname: "subscriber",
      email: "massshootingdatabase@gmail.com",
    };
    const response = await request
      .post("/api/newsletter/signup")
      .send(dummySubscriber);

    expect(response.statusCode).toBe(200);
  });

  it("confirms the subscription", async () => {
    // invalid, no params
    const response = await request.get("/api/newsletter/confirm");
    expect(response.statusCode).toBe(500);

    // bad email
    const response1 = await request
      .get("/api/newsletter/confirm")
      .query({ email: "nonexistent@gmail.com" });
    expect(response1.body.error).toEqual("Subscription was unsuccessful");

    // good email, no conf num
    const response2 = await request
      .get("/api/newsletter/confirm")
      .query({ email: "massshootingdatabase@gmail.com" });
    expect(response2.body.error).toEqual("Confirmation number does not match");
  });
});
