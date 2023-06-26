import "reflect-metadata";
import { createConnection} from "typeorm";
import { Doctors } from "../entity/Doctors";
import { Clinics } from "../entity/Clinics";
import { Treatments } from "../entity/Treatments";
import DoctorsService from "../services/DoctorsService";
import ClinicsService from "../services/ClinicsService";
import TreatmentsService from "../services/Treatments";

class Database {
  async connetDataBase() {
    try {
      await createConnection();
      const treatments = await TreatmentsService.create({
          "name" : "Dolgu",
          "description" : "Gerekli dolgunun yapılması",
          "price" : "500"
      }) as Treatments
      const clinics = await ClinicsService.create({
          "name" : "Çınar polikinlik",
          "address" : "İstanbull osmangazi 600 evler",
          "contactNumber" : "02242334502",
          "commissionRate" : "18"

      }) as Clinics
      await DoctorsService.create({
          "firstname" : "Joe",
          "lastname" : "Darwin",
          "phone" : "02242334502",
          "specialization" : "PROF",
          "treatments" : [treatments],
          "clinic" : clinics
      })
      console.log("Successfully connection database.");
    } catch (error) {
      console.log(error)
    }
  }
}

export default new Database();
