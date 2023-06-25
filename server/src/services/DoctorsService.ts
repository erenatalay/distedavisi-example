import BaseService  from "./BaseService";
import { Doctors } from "../entity/Doctors";

 export class DoctorsService extends BaseService {
    constructor(){
        super(Doctors)
    }
}

export default new DoctorsService();