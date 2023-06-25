import { Appointment } from "../entity/Appointment";
import BaseService  from "./BaseService";

 export class AppointmentService extends BaseService {
    constructor(){
        super(Appointment)
    }
}

export default new AppointmentService();