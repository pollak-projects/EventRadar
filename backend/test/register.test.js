import request from "supertest";
import app from "../../index.js";

test("POST auth/register should fail", async () => {
  const response = await request(app).post("/auth/register").send({
    username: "test",
    nev: "test",
    password: "test",
    groupsNeve: "USER",
  });

  expect(response.status).toBe(400);
});