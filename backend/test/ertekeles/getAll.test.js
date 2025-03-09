import request from "supertest";
import app from "../../index.js";

test("GET ertekeles/getAll should pass", async () => {
  const response = await request(app).get("/ertekeles/getAll");
     expect(response.status).toBe(201);
  });
