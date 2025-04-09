import request from "supertest";
import app from "../../index.js";

test("PUT user/update should pass", async () => {
  const response = await request(app).put("/user/update").send({
    id: 55,
    username: "updated_test",
    email: "updated_test",
    groupNeve: "user",
    password1: "updated_test",
    password2: "updated_test",
  });
  console.log(response.status, response.body);

  expect(response.status).toBe(200);
});
