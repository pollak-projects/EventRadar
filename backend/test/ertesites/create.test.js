import request from "supertest";
import app from "../../index.js";

test("POST ertesites/create should pass", async () => {
  const response = await request(app).post("/ertesites/create").send({
    esemeny_nev: "test",
    leiras: "test",
    helyszin: "test",
    esemeny_date: "2025-03-10",
  });

  expect(response.status).toBe(201);
});