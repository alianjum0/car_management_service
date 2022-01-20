import { Request, Response, NextFunction } from "express";

export const authHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const {userid}= request.headers;

  if(!userid){
    const message = "Not authorized";
    return response.status(401).send(message);
  }

  next();
};
