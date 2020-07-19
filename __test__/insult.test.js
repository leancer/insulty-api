const supertest = require('supertest')
const app = require("../app");
const request = supertest(app)
const mongoose = require("mongoose");
const Insult = require("../models/insult");

beforeAll(async() => {
    await Insult.deleteMany({});
})

beforeEach(() => {
    jest.setTimeout(10000);
    
})

afterAll(async (done) => {
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

describe("GET /insult/:lang",() => {
    it("sould return Random Insult based on Lang", async done => {
        const data = [
            {
                "insult":"TUM BOHATaaa",
                "lang":"hindi"
            },
            {
                "insult":"TUM BOHATaaddd",
                "lang":"english"
            },
            {
                "insult":"TUM BOHALO",
                "lang":"hindi"
            }
        ];
        const lang = "hindi";
        await Insult.insertMany(data);
        const res = await request.get("/insult/"+lang);
        expect(res.body.data.lang).toBe("hindi");
       done(); 
    })
    it("sould return err for no insult found if wrong lang given", async done => {
    
        const res = await request.get("/insult/guj");
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
