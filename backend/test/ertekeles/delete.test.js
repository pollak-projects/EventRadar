import request from "supertest";
import app from "../../index.js";

test("DELETE ertekeles/delete should pass", async () => {
  const ertekeles_id = 1;

  const response = await request(app).delete(`/ertekeles/delete/${ertekeles_id}`)
  expect(response.status).toBe(200);
});