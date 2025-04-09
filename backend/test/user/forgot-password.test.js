import request from "supertest";
import app from "../../index.js";

test("POST user/forgot-password should pass", async () => {
  const response = await request(app).post("/user/forgot-password").send({
    email: "test@test.com",
  });

  console.log(response);
  expect(response.status).toBe(200);
});
