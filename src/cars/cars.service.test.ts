import { BaseCar, Car } from "./car.interface";
import { findAll, find, create, update, remove } from "./cars.service";

const dummyCar: Car = {
  id: 1,
  userId: 1,
  make: "Renault",
  color: "white",
  year: 2021,
  price: 19999,
};

describe("Car Service", () => {
  it("should return all cars", async () => {
    const cars = await findAll(1);
    expect(cars.length).toEqual(2);
    expect(cars[0]).toMatchObject(dummyCar);
  });

  it("should return a car by id -> [id: 1]", async () => {
    const car = await find(1, 1);
    expect(car).toBeDefined();
    expect(car!.id).toEqual(1);
    expect(car).toMatchObject(dummyCar);
  });

  it("should create a car", async () => {
    const tempCar: BaseCar = {...dummyCar};
    const car = await create(tempCar);
    expect(car).toBeDefined();
    const cars = await findAll(1);
    expect(cars.length).toEqual(3);
  });
  
  it("should update a car", async () => {
    const tempCar: Car = {...dummyCar, year: 2010};
    const car = await update(1, tempCar);
    expect(car).toBeDefined();
    expect(car!.id).toEqual(1);
    expect(car!.year).toEqual(2010);
  });
  it("should remove car with id", async () => {
    const response = await remove(1, 1);
    const cars = await findAll(1);
    expect(cars.length).toEqual(2);
  });
});
