import request from "supertest";
import app from "../../index.js";

test("GET ertesites/getAll should pass", async () => {
  const response = await request(app).get("/ertesites/getAll");
     expect(response.status).toBe(201);
  });
