import { parseISO } from "date-fns";
import { Router } from "express";
import { getCustomRepository } from "typeorm";
import ensureAuthenticated from "../database/middleware/ensureAuthenticated";
import CreateAppointmentService from "../../../../modules/appointments/services/CreateAppointmentService";
import AppointmentsRepository from "../../../../modules/appointments/repositories/AppointmentsRepository";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get("/", async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  if (appointments) {
    return response.json(appointments);
  }
  return response.json({ error: "Appoiments not found!" });
});

appointmentsRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
