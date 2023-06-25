import { Treatments } from "./../entity/Treatments";
import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import * as asyncErrorWrapper from "express-async-handler";
import TreatmentsService from "../services/Treatments";
import { Pagination } from "../utils/Pagination";
import DoctorsService from "../services/DoctorsService";
import { Doctors } from "../entity/Doctors";
class treatment {
  gets = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Treatments>,
      res: Response,
      next: NextFunction
    ) => {
      const threatments = await TreatmentsService.list({}, ["doctors"]);
      res.status(200).json({
        success: true,
        data: threatments,
      });
    }
  );
  getDoctorTreatment = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Treatments>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as Treatments;
      const page = Number(req.query.page) || 1;
      const perPage = Number(req.query.perPage) || 10;
      const doctors = await DoctorsService.find({"id" : id},["treatments"]) as Doctors;
      const getTreatments = Pagination<Treatments>(doctors.treatments, page, perPage);
      res.status(200).json({
        success: true,
        data: getTreatments,
      });
    }
  );
  create = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Treatments>,
      res: Response,
      next: NextFunction
    ) => {
      const { description, name, price } = req.body;
      const treatments = await TreatmentsService.create({
        description,
        price,
        name,
      });
      res.status(200).json({
        success: true,
        data: treatments,
      });
    }
  );

  update = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Treatments>,
      res: Response,
      next: NextFunction
    ) => {
      const { description, name, price } = req.body;

      const { id } = req.params as unknown as Treatments;
      const treatments = await TreatmentsService.find({ id });
      if (!treatments) {
        return next(new CustomError("There is no such treatments.", 400));
      }
      const clinics = await TreatmentsService.update(
        {
          description,
          price,
          name,
        },
        id
      );

      res.status(200).json({
        success: true,
        data: clinics,
      });
    }
  );

  delete = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Treatments>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as Treatments;
      const treatments = (await TreatmentsService.find({ id })) as Treatments;
      if (!treatments) {
        return next(new CustomError("There is no such treatments.", 400));
      }
      await TreatmentsService.delete(id);

      res.status(200).json({
        success: true,
        message: "Successfuly delete.",
      });
    }
  );

  find = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Treatments>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as Treatments;
      const treatments = await TreatmentsService.find({ id }, ["doctors"]);
      if (!treatments) {
        return next(new CustomError("There is no such treatments.", 400));
      }
      res.status(200).json({
        success: true,
        data: treatments,
      });
    }
  );
}

export default new treatment();
