import request from "supertest";
import faker from "faker";

import AppServer from "../../server";
import AlertModel from "./../../models/AlertModel";

describe("Alert suite tests", () => {
  beforeEach(async () => {
    await AlertModel.deleteMany({});
  });

  it("Shoud create an alert for a specific keyword", async () => {
    const payload = {
      keyword: faker.random.alphaNumeric(10),
      email: faker.internet.email(),
      interval: 2
    };

    const response = await request(AppServer)
      .post("/alerts")
      .send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("keyword");
    expect(response.body).toHaveProperty("interval");
  });

  it("Shoud return bad request when an alert for same email and keyword alredy exists", async () => {
    const payload = {
      keyword: faker.random.alphaNumeric(10),
      email: faker.internet.email(),
      interval: 2
    };
    await request(AppServer)
      .post("/alerts")
      .send(payload);

    const response = await request(AppServer)
      .post("/alerts")
      .send(payload);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("Shoud return bad request when keyword is missing", async () => {
    const response = await request(AppServer)
      .post("/alerts")
      .send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("Shoud return bad request when e-mail is missing", async () => {
    const payload = {
      keyword: faker.random.alphaNumeric(10),
      interval: 2
    };

    const response = await request(AppServer)
      .post("/alerts")
      .send(payload);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("Shoud return bad request when interval is missing", async () => {
    const payload = {
      keyword: faker.random.alphaNumeric(10),
      email: faker.internet.email()
    };

    const response = await request(AppServer)
      .post("/alerts")
      .send(payload);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("Shoud return bad request when interval is not one of (2, 10, 30)", async () => {
    const payload = {
      keyword: faker.random.alphaNumeric(10),
      email: faker.internet.email(),
      interval: 1
    };

    const response = await request(AppServer)
      .post("/alerts")
      .send(payload);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("Shoud return array of alerts or empty", async () => {
    const response = await request(AppServer).get("/alerts");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("Shoud update and alert by his id", async () => {
    const payload = {
      keyword: faker.random.alphaNumeric(10),
      email: faker.internet.email(),
      interval: 2
    };
    const postResponse = await request(AppServer)
      .post("/alerts")
      .send(payload);

    const updateResponse = await request(AppServer)
      .put(`/alerts/${postResponse.body._id}`)
      .send({
        interval: 30
      });

    expect(updateResponse.status).toBe(204);
  });

  it("Shoud delete and alert by his id", async () => {
    const payload = {
      keyword: faker.random.alphaNumeric(10),
      email: faker.internet.email(),
      interval: 2
    };
    const postResponse = await request(AppServer)
      .post("/alerts")
      .send(payload);

    const updateResponse = await request(AppServer).delete(
      `/alerts/${postResponse.body._id}`
    );

    expect(updateResponse.status).toBe(204);
  });
});
