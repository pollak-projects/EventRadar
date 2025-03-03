import request from "supertest";
import app from "../../index.js";


test("POST group/update should pass", async () => {
  const response = await request(app).post("/group/update").send({
    neve: "test",
    ujnev: "test",
  });

  expect(response.status).toBe(400);
});