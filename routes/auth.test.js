const app = require('../index') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require('mongoose');

const User = require("../models/User");
const Priv = require("../models/Privileges");
const Admin = require("../models/Admin");
const jwt = require('jsonwebtoken');



describe('Authorization and Authentication Requests', () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.DB_SERVER);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Testing to see if Jest works', () => {
        expect(1).toBe(1)
    });

    //REGISTER ENDPOINT
    
    it('Successfully registers a user', async () => {

        const response0 = await request.post("/api/auth/register").send({email: "dummyfailure@gmail.com"});
        expect(response0.statusCode).toBe(400);

        const dummyUser = {
            email: "dummyRegister@yahoo.com",
            password: "Password1"
        };

        const response = await request.post("/api/auth/register").send(dummyUser);
        expect(response.statusCode).toBe(201);

        const insertedUser = await User.findOne({email: dummyUser.email});
        expect(insertedUser.email).toEqual(dummyUser.email);

        //Try to reregister with same credentials
        const response2 = await request.post("/api/auth/register").send(dummyUser);
        expect(response2.statusCode).toBe(400);

        await User.deleteOne({email: dummyUser.email});
    });

    //LOGIN USER
    it('Succesfully logs in the user', async () => {

        //empty password
        const response0 = await request.post("/api/auth/login").send({email: "anytihgn@aol.com"});
        expect(response0.statusCode).toBe(400);
        expect(response0.body.error).toEqual("Please provide an email and password");

        //empty email
        const response1 = await request.post("/api/auth/login").send({password: "Password1"});
        expect(response1.statusCode).toBe(400);
        expect(response1.body.error).toEqual("Please provide an email and password");

        //mismatch fields
        const response2 = await request.post("/api/auth/login").send({
            email: "DoesNotExist@yahoo.com",
            password: "WrongPassword"
        });
        expect(response2.statusCode).toBe(401);
        expect(response2.body.error).toEqual("Invalid credentials");

        const response3 = await request.post("/api/auth/login").send({
            email: "dummyEmail@yahoo.com",
            password: "WrongPassword"
        });
        expect(response3.statusCode).toBe(401);
        expect(response3.body.error).toEqual("Invalid credentials");

        //success
        const dummyUser = {
            email: "dummyEmail@yahoo.com",
            password: "Password1"
        };
        const response = await request.post("/api/auth/login").send(dummyUser);
        expect(response.statusCode).toBe(200);

        const insertedUser = await User.findOne({email: dummyUser.email});
        expect(insertedUser.email).toEqual(dummyUser.email);
    });

    it('Sends the forgot password email', async () => {
        const response = await request.post("/api/auth/forgotpassword").send({email: "massshootingdatabase@gmail.com"});
        expect(response.statusCode).toBe(200);
    });

    //RESET PASSWORD 
    it('Resets the user password', async () => {
        
        //invalid token || no token
        const response = await request.put("/api/auth/resetpassword/invalidtoken");
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toEqual("Invalid Token");

        //success case
    });

    //GET PRIVILEGE LEVEL
    it('Gets the access level of the user', async () => {

        //invalid request no token
        const response = await request.get("/api/auth/privilege").send({email: "massshootingdatabase@gmail.com"});
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toEqual("Not logged in.");

        const invalidToken = jwt.sign(
            {id: "624a52501c5796cf2c190777"}, 
            process.env.JWT_SECRET, 
            {expiresIn: process.env.JWT_EXPIRE,}
            );
        const invalidUser = "Bearer " + invalidToken;
        const response0 = await request.get("/api/auth/privilege").set('Authorization', invalidUser);
        expect(response0.body.error).toEqual("No user found with this id");


        //valid request
        const admin = await Admin.findOne({email: "superuser@gmail.com"});
        const token = admin.getSignedToken();

        const auth = "Bearer " + token;

        const response1 = await request.get("/api/auth/privilege").set('Authorization', auth);
        expect(response1.statusCode).toBe(201);
        expect(response1.body.accessLevel).toBe(5);

    });

    //PRIVILEGE ADD

    it('adds an admin with privilege level', async () => {

        const dummyAdmin = {
            email: "dummyAdmin@yahoo.com",
            accessLevel: 5
        };
        await Priv.deleteOne({email: dummyAdmin.email});

        //calls the give privilege endpoint with the dummy user
        const response = await request.post("/api/auth/giveprivilege").send(dummyAdmin);
        expect(response.statusCode).toBe(201);
        expect(response.body.admin.accessLevel).toBe(dummyAdmin.accessLevel);

        //checks the database for a matching user
        const insertedAdmin = await Priv.findOne({email: dummyAdmin.email});
        expect(insertedAdmin.email).toEqual(dummyAdmin.email);

        //deletes the inserted user
        await Priv.deleteOne({email: dummyAdmin.email});
    });

    
/*
    it('Changes the password', () => {
        expect(1).toBe(1)
    });

    it('Changed password works', () => {
        expect(1).toBe(1)
    });

    it('Old password does not work', () => {
        expect(1).toBe(1)
    });

    it('Gets the newly registers users privilege lvl', () => {
        expect(1).toBe(1)
    });
    */
    

});

