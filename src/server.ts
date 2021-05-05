import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import uploadConfig from "./config/upload";

import "./shared/database";
import { AppError } from "./shared/error/error";
import { errorHandler } from "./shared/database/middleware/errorHandle";

import routes from "./routes";

const app = express();
const port = 3030;

app.use(express.json());
app.use("/files", express.static(uploadConfig.diretory));
app.use(routes);

app.use(errorHandler);

// tslint:disable-next-line: no-console
app.listen(port, () => console.log(`Example app listening on port ${port}`));
