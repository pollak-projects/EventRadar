import request from "supertest";
import app from "../../index.js";

test("DELETE ertesites/delete should pass", async () => {
  const response = await request(app).delete("/ertesites/delete").send({
    id: 1,
  });

  expect(response.status).toBe(200);
});