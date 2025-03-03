import request from "supertest";
import app from "../../index.js";


test("DELETE group/delete should pass", async () => {
  const response = await request(app).delete("/group/delete").send({
    neve: "test",
  });

  expect(response.status).toBe(204);
});