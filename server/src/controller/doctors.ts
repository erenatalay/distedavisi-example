import { Request, Response, NextFunction } from "express";
import { In } from "typeorm";
import CustomError from "../utils/CustomError";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import * as asyncErrorWrapper from "express-async-handler";
import DoctorsService from "../services/DoctorsService";
import { Doctors } from "../entity/Doctors";
import ClinicsService from "../services/ClinicsService";
import TreatmentsService from "../services/Treatments";
import * as path from "path";
import { Pagination } from "../utils/Pagination";

class Doctor {
  gets = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Doctors>,
      res: Response,
      next: NextFunction
    ) => {
      const doctors = await DoctorsService.list({}, ["clinic", "treatments"]);
      res.status(200).json({
        success: true,
        data: doctors,
      });
    }
  );

  getClinicDoctor = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Doctors>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as Doctors;
      const page = Number(req.query.page) || 1;
      const perPage = Number(req.query.perPage) || 10;
      const doctors = await DoctorsService.list({ clinic: id }, [
        "clinic",
        "treatments",
      ]) as Doctors[];
      const getDoctors = Pagination<Doctors>(doctors, page, perPage);
      res.status(200).json({
        success: true,
        data: getDoctors,
      });
    }
  );

  create = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Doctors>,
      res: Response,
      next: NextFunction
    ) => {
      const { firstname, phone, lastname, specialization, clinic, treatments } =
        req.body;
      const clinics = await ClinicsService.find({ id: clinic });
      const treatment = await TreatmentsService.list({ id: In(treatments) });
      const doctors = await DoctorsService.create({
        firstname,
        phone,
        lastname,
        specialization,
        clinic: clinics,
        treatments: treatment,
      });
      res.status(200).json({
        success: true,
        data: doctors,
      });
    }
  );

  update = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Doctors>,
      res: Response,
      next: NextFunction
    ) => {
      const { clinic, treatments, firstname, lastname, phone, specialization } =
        req.body;
      const { id } = req.params as unknown as Doctors;
      const clinics = await ClinicsService.list({ id: clinic });
      const treatment = await TreatmentsService.list({ id: In(treatments) });
      const doctorsFind = await DoctorsService.find({ id });
      if (!doctorsFind) {
        return next(new CustomError("There is no such doctor.", 400));
      }
      const doctors = await DoctorsService.update(
        {
          firstname,
          phone,
          lastname,
          specialization,
          clinics,
          treatment,
        },
        id
      );

      res.status(200).json({
        success: true,
        data: doctors,
      });
    }
  );

  delete = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Doctors>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as Doctors;
      const doctors = (await DoctorsService.find({ id })) as Doctors;
      if (!doctors) {
        return next(new CustomError("There is no such doctors.", 400));
      }
      await DoctorsService.delete(id);

      res.status(200).json({
        success: true,
        message: "Successfuly delete.",
      });
    }
  );

  find = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Doctors>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as Doctors;
      const doctorsFind = await DoctorsService.find({ id }, [
        "clinic",
        "treatments",
      ]);
      if (!doctorsFind) {
        return next(new CustomError("There is no such doctors.", 400));
      }
      res.status(200).json({
        success: true,
        data: doctorsFind,
      });
    }
  );

  updateImage = asyncErrorWrapper(
    async (req: any, res: Response, next: NextFunction) => {
      const { id } = req.params as unknown as Doctors;
      const doctorsFind = (await DoctorsService.find({ id })) as Doctors;
      if (!doctorsFind) {
        return next(new CustomError("There is no such doctors.", 400));
      }
      if (req?.files?.image?.length > 1) {
        return next(new CustomError("Up to 1 photos can be uploaded", 400));
      }
      if (!req?.files?.image) {
        return next(new CustomError("Please select a file", 400));
      }
      if (req?.files?.image?.mimetype.split("/")[0] !== "image") {
        return next(new CustomError("Please select just a image", 400));
      }
      const extension = path.extname(req.files.image.name);
      const fileName = `${
        doctorsFind?.firstname.toLowerCase().split(" ")[0]
      }${id}${extension}`;
      const folderPath = path.join(
        __dirname,
        "../",
        "uploads/doctors",
        fileName
      );
      console.log(folderPath);
      req.files?.image.mv(folderPath, async (err) => {
        if (err) {
          return res.status(500).send({ error: err });
        }
        const doctors = await DoctorsService.update(
          {
            image: `http://localhost:8080/uploads/doctors/${fileName}`,
          },
          id
        );
        res.status(200).send(doctors);
      });
    }
  );
}

export default new Doctor();
