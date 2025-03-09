import request from "supertest";
import app from "../../index.js";


test("GET user/getUserById/:id should pass", async () => {
    const userId = 1;

    const response = await request(app).get(`/user/getUserById/${userId}`).send({
        
    })
       expect(response.status).toBe(201);
    });
  

