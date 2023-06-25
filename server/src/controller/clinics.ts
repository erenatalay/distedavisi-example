import { Clinics } from "./../entity/Clinics";
import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import * as asyncErrorWrapper from "express-async-handler";
import ClinicsService from "../services/ClinicsService";
import { Pagination } from "../utils/Pagination";
class Clinic {
  gets = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Clinics>,
      res: Response,
      next: NextFunction
    ) => {
      const page = Number(req.query.page) || 1;
      const perPage = Number(req.query.perPage) || 10;
      const clinic = await ClinicsService.list({}, ["doctors","doctors.treatments"]) as Clinics[];
      const getClinins = Pagination<Clinics>(clinic, page, perPage);

      res.status(200).json({
        success: true,
        data: getClinins,
      });
    }
  );

  create = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Clinics>,
      res: Response,
      next: NextFunction
    ) => {
      const { address, contactNumber, name, commissionRate } = req.body;
      const clinics = await ClinicsService.create({
        address,
        contactNumber,
        name,
        commissionRate,
      });
      res.status(200).json({
        success: true,
        data: clinics,
      });
    }
  );

  update = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Clinics>,
      res: Response,
      next: NextFunction
    ) => {
      const { address, contactNumber, name, commissionRate } = req.body;
      const { id } = req.params as unknown as Clinics;
      const clinic = await ClinicsService.find({ id });
      if (!clinic) {
        return next(new CustomError("There is no such clinic.", 400));
      }
      const clinics = await ClinicsService.update(
        {
          address,
          contactNumber,
          name,
          commissionRate,
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
      req: CustomAuthRequest<Clinics>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as Clinics;
      const clincis = (await ClinicsService.find({ id })) as Clinics;
      if (!clincis) {
        return next(new CustomError("There is no such clinic.", 400));
      }
      await ClinicsService.delete(id);

      res.status(200).json({
        success: true,
        message: "Successfuly delete.",
      });
    }
  );

  find = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Clinics>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as Clinics;
      const clinics = await ClinicsService.find({ id }, ["doctors"]);
      if (!clinics) {
        return next(new CustomError("There is no such clinic.", 400));
      }
      res.status(200).json({
        success: true,
        data: clinics,
      });
    }
  );
}

export default new Clinic();
