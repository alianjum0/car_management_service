import { Request, Response, NextFunction } from "express";

export const authHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  if(!request.headers || !request.headers['userid']){
    const message = "Not authorized";
    return response.status(401).send(message);
  }

  next();
};
