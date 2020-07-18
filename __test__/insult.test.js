const supertest = require('supertest')
const app = require("../app");
const request = supertest(app)
const mongoose = require("mongoose");
const Insult = require("../models/insult");

beforeEach(async () => {
    jest.setTimeout(10000);
    await Insult.deleteMany({});
})

afterAll(async (done) => {
    await Insult.deleteMany({});
    mongoose.disconnect();
    done();
})

describe("GET /insult",() => {
    it("sould return err for no insult found", async done => {
    
        const res = await request.get("/insult");
        expect(res.body.err).toBe("no Insult Found");
       done(); 
    })
})

describe("POST /insult/add",() => {
    it("sould add Insult successFully", async done => {
        const data = {
            insult:"you dumb ass",
            lang:"english"
        }
        const res = await request.post("/insult/add").send(data);
        expect(res.body.status).toBe("success");
       done(); 
    })
    
})
