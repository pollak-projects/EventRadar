import request from "supertest";
import app from "../../index.js";

test("GET user/getGroups should pass", async () => {
    const response = await request(app).get("/user/getGroups");
       expect(response.status).toBe(200);
    });
  