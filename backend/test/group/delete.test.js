import request from "supertest";
import app from "../../index.js";


/*test("DELETE group/delete should pass", async () => {
  const response = await request(app).delete("/group/delete").send({
    neve: "test",
  });

  expect(response.status).toBe(204);
});

import request from "supertest";
import app from "../../index.js";
*/

test("DELETE group/delete should pass", async () => {
  const addedgroup = await request(app).post("/group/add").send({
    neve: "User"
  });

  expect(addedgroup.status).toBe(201);
  const createdGroup = addedgroup.body;

  const response = await request(app).delete("/group/delete").send({
    id: createdGroup.id,
  });

  expect(response.status).toBe(204);
});