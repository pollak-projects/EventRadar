import request from "supertest";
import app from "../../index.js";

test("DELETE user/delete should pass", async () => {
  const response = await request(app).delete("/user/delete").send({
    id: 1,
    
  });

  expect(response.status).toBe(200);
});