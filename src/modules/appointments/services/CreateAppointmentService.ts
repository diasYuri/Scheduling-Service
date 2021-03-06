import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";
import { AppError } from "../../../shared/error/error";
import IAppointmentsRepository from "../infra/repository/IAppointments";

import Appointment from "../infra/typeorm/entities/Appointment";
import AppointmentsRepository from "../infra/typeorm/repositories/AppointmentsRepository";

interface Request {
  date: Date;
  provider_id: string;
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
