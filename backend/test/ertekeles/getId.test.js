import request from "supertest";
import app from "../../index.js";

test("GET ertekeles/getId should pass", async () => {
    const response = await request(app).get("/ertekeles/getId/1")
       expect(response.status).toBe(200);
    });
  

    