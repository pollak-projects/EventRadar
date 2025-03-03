import request from "supertest";
import app from "../../index.js";


test("PUT ertesites/update should pass", async () => {
  const response = await request(app).put("/ertesites/update").send({
    id: 1,
    esemeny_nev: "test",
    leiras: "test",
    helyszin: "test",
    esemeny_date: "2025-03-10",
  });

  expect(response.status).toBe(200);
});