import request from "supertest";
import app from "../../index.js";



test("PUT user/update should pass", async () => {
   const userresponse = await request(app).post("/auth/register").send({
     username: "test",
     email: "test",
     groupNeve: "user",
     password1: "test",
     password2: "test",
   });
   console.log(userresponse.text)
    const response = await request(app).put("/user/update").send({
        id: JSON.parse(userresponse.text).id,
        username: "updated_test",
        email: "updated_test",
        groupNeve: "user",
        password1: "updated_test",
        password2: "updated_test",
       
      });
      console.log(response.status, response.body);

      expect(response.status).toBe(200);
    });
