import request from "supertest";
import app from "../../index.js";

test("DELETE esemenyek/delete should pass", async () => {
  const id = 1;
  const foundEsemeny = await request(app).get(`/event/getId/${id}`);

  if (foundEsemeny.body.length > 0) {
    const response = await request(app).delete("/event/delete").send({
      id: foundEsemeny.body.id,
    });
    console.log(response.body);
    expect(response.status).toBe(204);
  } else {
    const addedesemenyek = await request(app).post("/event/create").send({
      esemeny_nev: "teszt",
      leiras: "teszt",
      helyszin: "teszt",
      esemeny_date: "2025-03-19",
      kezdetido: "10:00",
      kategoria: "Koncert",
      user: 2,
      foszam: 10,
      hossz: 3,
    });

    expect(addedesemenyek.status).toBe(201);
    const createdEsemenyek = addedesemenyek.body;

    console.log(addedesemenyek.body);

    const response = await request(app).delete("/event/delete").send({
      id: createdEsemenyek.id,
    });

    expect(response.status).toBe(200);
  }
});
