import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import * as asyncErrorWrapper from "express-async-handler";
import PaymentsService from "../services/PaymentService";
import { Payment } from "../entity/Payment";
import ClinicsService from "../services/ClinicsService";
import  TreatmentsService  from "../services/Treatments";
import { Clinics } from "../entity/Clinics";
import { Treatments } from "../entity/Treatments";
class Payments {
  gets = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Payment>,
      res: Response,
      next: NextFunction
    ) => {
      const doctors = await PaymentsService.list({});
      res.status(200).json({
        success: true,
        data: doctors,
      });
    }
  );

  create = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Payment>,
      res: Response,
      next: NextFunction
    ) => {
      const {
        appointment,
        cardCVV,
        cardExpirationDate,
        cardHolderName,
        clinic,
        cardNumber,
        description,
        treatment,
      } = req.body;
      const clinics = await ClinicsService.find({ id: clinic }) as Clinics;
      const treatments = await TreatmentsService.find({ id: treatment }) as Treatments ;
      if (!treatments) {
        return next(new CustomError("There is no such treatments.", 400));
      }
      if (!clinics) {
        return next(new CustomError("There is no such clinics.", 400));
      }
      const amount = String( (100 / Number(clinics.commissionRate)) * Number(treatments.price))
      const payments = await PaymentsService.create({
        appointment,
        cardCVV,
        cardExpirationDate,
        cardHolderName,
        cardNumber,
        description,
        treatment: treatments,
        clinic:clinics,
        amount
      });
      res.status(200).json({
        success: true,
        data: payments,
      });
    }
  );

  update = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Payment>,
      res: Response,
      next: NextFunction
    ) => {
      const data = req.body;
      const { id } = req.params as unknown as Payment;
      const payment = await PaymentsService.find({ id });
      if (!payment) {
        return next(new CustomError("There is no such payment.", 400));
      }
      const payments = await PaymentsService.update(data, id);

      res.status(200).json({
        success: true,
        data: payments,
      });
    }
  );

  delete = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Payment>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as Payment;
      const payment = (await PaymentsService.find({ id })) as Payment;
      if (!payment) {
        return next(new CustomError("There is no such payment.", 400));
      }
      await PaymentsService.delete(id);

      res.status(200).json({
        success: true,
        message: "Successfuly delete.",
      });
    }
  );

  find = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Payment>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as Payment;
      const payment = await PaymentsService.find({ id });
      if (!payment) {
        return next(new CustomError("There is no such payment.", 400));
      }
      res.status(200).json({
        success: true,
        data: payment,
      });
    }
  );
}

export default new Payments();
