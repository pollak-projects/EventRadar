import request from "supertest";
import app from "../../index.js";



test("DELETE user/delete should pass", async () => {
  const addeduser = await request(app).post("/auth/register").send({
    username: "testuser",
    email: "testuser@example.com",
    password1: "password123",
    password2: "password123",
    groupsNeve: "User",
  });

   expect(addeduser.status).toBe(201);
   const createdUser = addeduser.body;

  const  response = await request(app).delete("/user/delete").send({
    id: createdUser.id 
    
  });

  expect(response.status).toBe(200);
});