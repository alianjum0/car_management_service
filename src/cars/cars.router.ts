/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
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
carsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const cars: Car[] = await CarService.findAll(req.headers.userid);

    res.status(200).send(cars);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// GET cars/:id
carsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const userId: number = parseInt(req.headers.userid, 10);

  try {
    const car: Car = await CarService.find(userId, id);

    if (car) {
      return res.status(200).send(car);
    }

    res.status(404).send("car not found");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// POST cars
carsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const car: BaseCar = req.body;
    car.userId = parseInt(req.headers.userid, 10);

    const newCar = await CarService.create(car);

    res.status(201).json(newCar);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// PUT cars/:id
carsRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const carUpdate: Car = req.body;
    carUpdate.userId = parseInt(req.headers.userid, 10);

    const existingCar: Car = await CarService.find(carUpdate.userId, id);

    if (existingCar) {
      const updatedCar = await CarService.update(id, carUpdate);
      return res.status(200).json(updatedCar);
    }

    const newCar = await CarService.create(carUpdate);

    res.status(201).json(newCar);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// DELETE cars/:id
carsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const userId: number = parseInt(req.headers.userid, 10);
    await CarService.remove(userId, id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
