/**
 * Data Model Interfaces
 */
import { BaseCar, Car } from "./car.interface";
import { Cars } from "./cars.interface";

/**
 * In-Memory Store
 */
let cars: Cars = {
  1: {
    id: 1,
    userId: 1,
    make: "Renault",
    color: "white",
    year: 2021,
    price: 19999,
  },
  2: {
    id: 2,
    userId: 1,
    make: "BMW",
    color: "white",
    year: 2020,
    price: 19999,
  },
  3: {
    id: 3,
    userId: 2,
    make: "Fiat",
    color: "white",
    year: 2019,
    price: 19999,
  }
};

/**
 * Service Methods
 */
export const findAll = async (userId: number): Promise<Car[]> => Object.values(cars).filter(car => car.userId == userId);

export const find = async (userId: number, id: number): Promise<Car | null> => {
  return (cars[id] && cars[id].userId == userId) ? cars[id] : null;
}

export const create = async (newCar: BaseCar): Promise<Car> => {
  const id = new Date().valueOf();

  cars[id] = {
    ...newCar,
    id,
  };

  return cars[id];
};

export const update = async (
  id: number,
  carUpdate: Car
): Promise<Car | null> => {
  const car = await find(carUpdate.userId, id);

  if (!car) {
    return null;
  }

  cars[id] = { ...carUpdate };

  return cars[id];
};

export const remove = async (userId: number, id: number): Promise<null | void> => {
  const car = await find(userId, id);

  if (!car) {
    return null;
  }

  delete cars[id];
};
