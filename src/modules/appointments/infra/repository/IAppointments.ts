import Appointment from "../typeorm/entities/Appointment";

export default interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
