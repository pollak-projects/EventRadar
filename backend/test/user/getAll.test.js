import request from "supertest";
import app from "../../index.js";


test("GET user/getAll should pass", async () => {
    const response = await request(app).get("/user/getAll");
       expect(response.status).toBe(201);
    });
   