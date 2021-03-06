import { parseISO } from "date-fns";
import { Router } from "express";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";
import AppointmentsRepository from "../typeorm/repositories/AppointmentsRepository";
import ensureAuthenticated from "../../../users/infra/http/middleware/ensureAuthenticated";

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

/* appointmentsRouter.get("/", async (request, response) => {
  const appointments = await appointmentsRepository.find();

  if (appointments) {
    return response.json(appointments);
  }
  return response.json({ error: "Appoiments not found!" });
}); */

appointmentsRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(
    appointmentsRepository
  );

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
