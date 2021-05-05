import { AppError } from "@shared/error/error";
import { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction
) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // tslint:disable-next-line: no-console
  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}
