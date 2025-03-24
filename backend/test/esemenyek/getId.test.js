 import request from "supertest";
 import app from "../../index.js";

 test("GET esemenyek/getId should pass", async () => {
    const id =  1;
   const response = await request(app).get(`/esemenyek/getId/${id}`);
   expect(response.status).toBe(200);
 });
  

    