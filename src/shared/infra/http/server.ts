import express from "express";
import "express-async-errors";
import uploadConfig from "../../../config/upload";

import "../database";

import routes from "./routes";
import { errorHandler } from "../../../modules/users/infra/http/middleware/errorHandle";

const app = express();
const port = 3030;

app.use(express.json());
app.use("/files", express.static(uploadConfig.diretory));
app.use(routes);

app.use(errorHandler);

// tslint:disable-next-line: no-console
app.listen(port, () => console.log(`Example app listening on port ${port}`));
