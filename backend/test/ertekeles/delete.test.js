import request from "supertest";
import app from "../../index.js";

test("DELETE ertekeles/delete should pass", async () => {
  const response = await request(app).delete("/ertekeles/delete").send({
    ertekeles_id: 1,
  });

  expect(response.status).toBe(200);
});