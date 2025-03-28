import request from "supertest";
import app from "../../index.js";

test("POST esemenyek/create should pass", async () => {
  const response = await request(app).post("/event/create").send({
    esemeny_nev: "test",
    leiras: "test",
    helyszin: "test",
    esemeny_date: "2025-03-19",
    kezdetido: "10:00",
    vegeido: "12:00",
    kategoria: "Koncert"
  });

  expect(response.status).toBe(201);
});