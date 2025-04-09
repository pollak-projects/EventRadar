import request from "supertest";
import app from "../../index.js";

test("PUT esemenyek/update should pass", async () => {
  const addedesemenyek = await request(app).post("/event/create").send({
    esemeny_nev: "teszt",
    leiras: "teszt",
    helyszin: "teszt",
    esemeny_date: "2025-03-19",
    kezdetido: "10:00",
    vegeido: "12:00",
    kategoria: "Koncert",
    user: 2,
    foszam: 10,
  });

  const response = await request(app).put("/event/update").send({
    id: addedesemenyek.body.id,
    esemeny_nev: "teszt",
    leiras: "teszt",
    helyszin: "teszt",
    esemeny_date: "2025-03-20",
    kezdetido: "13:00",
    vegeido: "16:00",
    kategoria: "Színház",
  });

  console.log(response.body)

  if (addedesemenyek.body) {
    expect(response.status).toBe(200);
  } else {
    expect(response.status).toBe(400);
  }
});
