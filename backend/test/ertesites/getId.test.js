import request from "supertest";
import app from "../../index.js";

test("GET ertesites/getId should pass", async () => {
    const response = await request(app).get("/ertesites/getId").send({
        ertesites_id: 1,
    })
       expect(response.status).toBe(200);
    });
  

    