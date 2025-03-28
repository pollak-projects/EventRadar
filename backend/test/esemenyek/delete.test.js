import request from "supertest";
import app from "../../index.js";

test("DELETE esemenyek/delete should pass", async () => {
  const response = await request(app).delete("/event/delete").send({
    id: 1,
  });

  expect(response.status).toBe(200);
});

test("DELETE esemenyek/delete should pass", async () => {
  const addedesemenyek = await request(app).post("/event/create").send({
    esemeny_nev: "teszt",
    leiras: "teszt",
    helyszin: "teszt",
    esemeny_date: "2025-03-19",
    kezdetido: "10:00",
    vegeido: "12:00",
    kategoria: "Koncert"
  });

   expect(addedesemenyek.status).toBe(201);
   const createdEsemenyek = addedesemenyek.body;

  const  response = await request(app).delete("/event/delete").send({
    id: createdEsemenyek.id 
    
  });

  expect(response.status).toBe(200);
});