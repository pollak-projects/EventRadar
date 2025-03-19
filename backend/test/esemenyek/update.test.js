import request from "supertest";
import app from "../../index.js";

test("PUT esemenyek/update should pass", async () => {
  const response = await request(app).put("/esemenyek/update").send({
    id: 1,
    esemeny_nev: "teszt",
    leiras: "teszt",
    helyszin: "teszt",
    esemeny_date: "2025-03-20",
    kezdetido: "13:00",
    vegeido: "16:00",
    kategoria: "Színház",
  });

  expect(response.status).toBe(200);
});
