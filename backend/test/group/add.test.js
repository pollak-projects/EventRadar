import request from "supertest";
import app from "../../index.js";


test("POST group/add should pass", async () => {
  const response = await request(app).post("/group/add").send({
    neve: "test2",
  });

  expect(response.status).toBe(201);
});