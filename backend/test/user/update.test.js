import request from "supertest";
import app from "../../index.js";


test("PUT user/update should pass", async () => {
    const response = await request(app).put("/user/update").send({
        username: "test",
        email: "test",
        groupNeve: "test",
        password: "test",
       
      });
    
      expect(response.status).toBe(200);
    });
  