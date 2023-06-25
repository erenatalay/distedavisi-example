import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import * as asyncErrorWrapper from "express-async-handler";
import linkPaymentService from "../services/LinkedPaymentService";
import { LinkPayment } from "../entity/LinkPayment";
import ClinicsService from "../services/ClinicsService";
import TreatmentsService from "../services/Treatments";
import { Clinics } from "../entity/Clinics";
import { Treatments } from "../entity/Treatments";
class linkPayment {
  gets = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<LinkPayment>,
      res: Response,
      next: NextFunction
    ) => {
      const doctors = await linkPaymentService.list({});
      res.status(200).json({
        success: true,
        data: doctors,
      });
    }
  );

  create = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<LinkPayment>,
      res: Response,
      next: NextFunction
    ) => {
      const { clinic, description, paymentLink, treatment } = req.body;
      const clinics = await ClinicsService.find({ id: clinic }) as Clinics;
      const treatments = await TreatmentsService.find({ id: treatment }) as Treatments;
      if (!treatments) {
        return next(new CustomError("There is no such treatments.", 400));
      }
      if (!clinics) {
        return next(new CustomError("There is no such clinics.", 400));
      }
      const amount = String( (100 / Number(clinics.commissionRate)) * Number(treatments.price))

      const linkPayment = await linkPaymentService.create({
        amount,
        description,
        paymentLink,
        treatment: treatments,
        clinic: clinics,
      });
      res.status(200).json({
        success: true,
        data: linkPayment,
      });
    }
  );

  update = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<LinkPayment>,
      res: Response,
      next: NextFunction
    ) => {
      const data = req.body;
      const { id } = req.params as unknown as LinkPayment;
      const linkPayment = await linkPaymentService.find({ id });
      if (!linkPayment) {
        return next(new CustomError("There is no such linkpayment.", 400));
      }
      const linkPayments = await linkPaymentService.update(data, id);

      res.status(200).json({
        success: true,
        data: linkPayments,
      });
    }
  );

  delete = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<LinkPayment>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as LinkPayment;
      const linkPayment = (await linkPaymentService.find({
        id,
      })) as LinkPayment;
      if (!linkPayment) {
        return next(new CustomError("There is no such linkpayment.", 400));
      }
      await linkPaymentService.delete(id);

      res.status(200).json({
        success: true,
        message: "Successfuly delete.",
      });
    }
  );

  find = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<LinkPayment>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as LinkPayment;
      const linkPayment = await linkPaymentService.find({ id });
      if (!linkPayment) {
        return next(new CustomError("There is no such linkpayment.", 400));
      }
      res.status(200).json({
        success: true,
        data: linkPayment,
      });
    }
  );
}

export default new linkPayment();
