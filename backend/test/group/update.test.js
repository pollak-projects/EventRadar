import request from "supertest";
import app from "../../index.js";


test("PUT group/update should pass", async () => {
  const response = await request(app).put("/group/update").send({
    neve: "test",
    ujnev: "test",
  });

  expect(response.status).toBe(200);
});