import request from "supertest";
import app from "../../index.js";


test("PUT ertekeles/update should pass", async () => {
  const response = await request(app).put("/ertekeles/update").send({
    ertekeles_id: 1,
    rating: 1,
    comment: "test",
  });

  expect(response.status).toBe(200);
});