import request from 'supertest'
import {Express} from 'express-serve-static-core'
import { BaseCar, Car } from "./car.interface";

import app from '../index'

const dummyCar: Car = {
  id: 1,
  userId: 1,
  make: "Renault",
  color: "white",
  year: 2021,
  price: 19999,
};

describe("Car Management Service Routes", () => {
  it("should get all cars", async () => {
    const res = await request(app)
      .get("/api/cars")
      .set('userid', '1');
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.length).toEqual(2);
  });

  it("should get a car by id -> [id: 1]", async () => {
    const res = await request(app)
      .get("/api/cars/1")
      .set('userid', '1');
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body).toMatchObject(dummyCar);
  });

  it("should create a car ", async () => {
    const tempCar: BaseCar = {...dummyCar};
    const res = await request(app)
      .post("/api/cars")
      .send(tempCar)
      .set('userid', '1');
    expect(res.status).toEqual(201);
    expect(res.body).toBeDefined();
    const res1 = await request(app).get("/api/cars").set('userid', '1');
    expect(res1.body.length).toEqual(3);
  });

  it("should update a car by id -> [id: 1]", async () => {
    const tempCar: Car = {...dummyCar, year: 2010};
    const res = await request(app)
      .put("/api/cars/1")
      .send(tempCar)
      .set('userid', '1');
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.year).toEqual(2010);
  });

  it("should remove a car by id -> [id: 1]", async () => {
    const res = await request(app)
      .delete("/api/cars/1")
      .set('userid', '1');
    expect(res.status).toEqual(204);
    expect(res.body).toBeDefined();
    const res1 = await request(app).get("/api/cars").set('userid', '1');
    expect(res1.body.length).toEqual(2);
  });

  it("should return a 404 with an error message if id in not numeric [id: abc]", async () => {
    const res = await request(app)
      .get("/api/cars/abc")
      .set('userid', '1');
    expect(res.status).toEqual(404);
    expect(res.body).toBeDefined();
  });

  it("should return a 401 Unauthorized with an error message if authentication is not provided", async () => {
    const res = await request(app)
      .get("/api/cars/1");
    expect(res.status).toEqual(401);
    expect(res.body).toBeDefined();
  });
});
