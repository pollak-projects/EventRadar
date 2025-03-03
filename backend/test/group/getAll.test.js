import request from "supertest";
import app from "../../index.js";


test("POST group/getAll should pass", async () => {
  const response = await request(app).get("/group/getAll").send()
     expect(response.status).toBe(400);
  });
