/**
 * Required External Modules and Interfaces
 */
import express, { Response } from "express";
import { CustomRequest } from "../common/custom-header"
import * as CarService from "./cars.service";
import { BaseCar, Car } from "./car.interface";

/**
 * Router Definition
 */
export const carsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET cars
carsRouter.get("/", async (req: CustomRequest, res: Response) => {
  const userId: number = parseInt(req.headers.userid || '', 10);
  try {
    const cars: Car[] = await CarService.findAll(userId);

    res.status(200).send(cars);
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
});

// GET cars/:id
carsRouter.get("/:id", async (req: CustomRequest, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const userId: number = parseInt(req.headers.userid || '', 10);

  try {
    const car: Car | null = await CarService.find(userId, id);

    if (car) {
      return res.status(200).send(car);
    }

    res.status(404).send("car not found");
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
});

// POST cars
carsRouter.post("/", async (req: CustomRequest, res: Response) => {
  try {
    const car: BaseCar = req.body;
    car.userId = parseInt(req.headers.userid || '', 10);

    const newCar = await CarService.create(car);

    res.status(201).json(newCar);
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
});

// PUT cars/:id
carsRouter.put("/:id", async (req: CustomRequest, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const carUpdate: Car = req.body;
    carUpdate.userId = parseInt(req.headers.userid || '', 10);

    const existingCar: Car | null= await CarService.find(carUpdate.userId, id);

    if (existingCar) {
      const updatedCar = await CarService.update(id, carUpdate);
      return res.status(200).json(updatedCar);
    }

    const newCar = await CarService.create(carUpdate);

    res.status(201).json(newCar);
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
});

// DELETE cars/:id
carsRouter.delete("/:id", async (req: CustomRequest, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const userId: number = parseInt(req.headers.userid || '', 10);
    await CarService.remove(userId, id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
});
