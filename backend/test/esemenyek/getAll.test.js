import request from "supertest";
import app from "../../index.js";

test("GET esemenyek/getAll should pass", async () => {
  const response = await request(app).get("/event/getAll");
  expect(response.status).toBe(201);
});
