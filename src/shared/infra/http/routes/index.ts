import { Router } from "express";
import appointmentsRouter from "../../../../modules/appointments/infra/http/appointments.routes";
import sessionRouter from "../../../../modules/users/infra/http/routes/sessions.routes";
import usersRouter from "../../../../modules/users/infra/http/routes/users.routes";

const routes = Router();

routes.use("/appointments", appointmentsRouter);
routes.use("/users", usersRouter);
routes.use("/session", sessionRouter);

export default routes;
