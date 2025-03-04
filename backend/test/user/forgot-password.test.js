import request from "supertest";
import app from "../../index.js";

test("GET user/forgot-password should pass", async () => {
  const response = await request(app).get("/user/forgot-password").send({
    id: 1,
  });
  expect(response.status).toBe(200);
});