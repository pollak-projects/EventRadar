import request from "supertest";
import app from "../../index.js";


test("GET user/getUserById/:id should pass", async () => {
    const userId = 2;

    const response = await request(app).get(`/user/getUserById/${userId}`);
       expect(response.status).toBe(201);
    });
  

