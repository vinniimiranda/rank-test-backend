import request from "supertest";
import faker from "faker";

import AppServer from "../../server";

describe("Alert suite tests", () => {
  it("Shoud create an alert for a specific keyword", async () => {
    const payload = {
      keyword: faker.random.alphaNumeric(10),
      interval: 2
    };

    const response = await request(AppServer)
      .post("/alerts")
      .send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("keyword");
    expect(response.body).toHaveProperty("interval");
  });

  it("Shoud return bad request when keyword is missing", async () => {
    const response = await request(AppServer)
      .post("/alerts")
      .send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("Shoud return bad request when interval is missing", async () => {
    const payload = {
      keyword: faker.random.alphaNumeric(10)
    };

    const response = await request(AppServer)
      .post("/alerts")
      .send(payload);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
