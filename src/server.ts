import express from "express";
import { Request, Response, NextFunction } from "express";
//import "express-async-errors";

import "./database";
import { AppError } from "./error/error";

import routes from "./routes";

const app = express();
const port = 3030;

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
