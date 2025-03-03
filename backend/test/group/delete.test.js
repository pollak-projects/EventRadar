import request from "supertest";
import app from "../../index.js";


test("POST group/delete should pass", async () => {
  const response = await request(app).post("/group/delete").send({
    neve: "test",
  });

  expect(response.status).toBe(400);
});