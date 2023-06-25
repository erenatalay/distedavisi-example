import BaseService from "./BaseService";
import { Treatments } from "../entity/Treatments";
import { getRepository } from "typeorm";

export class TreatmentsService extends BaseService {
  constructor() {
    super(Treatments);
  }

}

export default new TreatmentsService();
