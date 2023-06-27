import { Request, Response, NextFunction } from "express";
import { In } from "typeorm";
import CustomError from "../utils/CustomError";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import * as asyncErrorWrapper from "express-async-handler";
import AppointmentService from "../services/AppointmentService";
import { Doctors } from "../entity/Doctors";
import * as path from "path";
import { Appointment } from "../entity/Appointment";
import ClinicsService from "../services/ClinicsService";
import TreatmentsService from "../services/Treatments";
import DoctorsService from "../services/DoctorsService";
import UserService from "../services/UserService";
import LinkedPaymentService from "../services/LinkedPaymentService";
import PaymentService from "../services/PaymentService";

class Appointments {
  gets = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Appointment>,
      res: Response,
      next: NextFunction
    ) => {
      const doctors = await AppointmentService.list({ user: req.user.id }, [
        "user",
        "doctor",
        "clinic",
        "treatment",
        "linkPayment",
        "payment"
      ]);
      res.status(200).json({
        success: true,
        data: doctors,
      });
    }
  );

  create = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Appointment>,
      res: Response,
      next: NextFunction
    ) => {
      const { linkPayment, clinic, treatment, doctor, payment, dateTime } =
        req.body;
      const clinics = await ClinicsService.find({ id: clinic });
      const treatments = await TreatmentsService.find({ id: treatment });
      const doctors = await DoctorsService.find({ id: doctor });
      const linkPayments = await LinkedPaymentService.find({ id: linkPayment });
      const payments = await PaymentService.find({ id: payment });

      if (!clinic) {
        return next(new CustomError("There is no such clinic.", 400));
      }
      if (!doctors) {
        return next(new CustomError("There is no such doctors.", 400));
      }
      if (!treatments) {
        return next(new CustomError("There is no such treatments.", 400));
      }

      if (payments && linkPayment) {
        return next(new CustomError("2 payment systems cannot be used at the same time.", 400));
      }

      if (6 >=  Number(new Date(dateTime).getHours())) {
        return next(new CustomError("6 and 19 o'clock you must make an appointment", 400));
      }

      if (new Date(dateTime).getHours() > 19) {
        return next(new CustomError("6 and 19 o'clock you must make an appointment", 400));
      }


      const appointment = await AppointmentService.create({
        clinic: clinics,
        treatment: treatments,
        doctor: doctors,
        linkPayment: linkPayments,
        payment: payments,
        user: req.user,
        dateTime,
        status: "scheduled"
      });
      res.status(200).json({
        success: true,
        data: appointment,
      });
    }
  );

  update = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Appointment>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as Appointment;
      const appointments = (await AppointmentService.find({
        id,
      })) as Appointment;
      if (!appointments) {
        return next(new CustomError("There is no such appointment.", 400));
      }
      const { status } = req.body;
      const appointment = await AppointmentService.update(
        {
          status,
        },
        id
      );
      res.status(200).json({
        success: true,
        data: appointment,
      });
    }
  );

  delete = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Appointment>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as Appointment;
      const appointment = (await AppointmentService.find({
        id,
      })) as Appointment;
      if (!appointment) {
        return next(new CustomError("There is no such appointment.", 400));
      }
      await AppointmentService.delete(id);

      res.status(200).json({
        success: true,
        message: "Successfuly delete.",
      });
    }
  );

  find = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Appointment>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as Doctors;
      const appointment = await AppointmentService.find({ id }, [
        "user",
        "doctor",
        "clinic",
        "treatment",
        "linkPayment",
        "payment"
      ]);
      if (!appointment) {
        return next(new CustomError("There is no such appointment.", 400));
      }
      res.status(200).json({
        success: true,
        data: appointment,
      });
    }
  );
}

export default new Appointments();
