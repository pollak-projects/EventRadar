import request from "supertest";
import app from "../../index.js";

test("GET group/getAll should pass", async () => {
  const response = await request(app).get("/group/getAll");
  console.log(response);
  expect(response.status).toBe(200);
});
