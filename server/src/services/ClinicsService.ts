import { Clinics } from './../entity/Clinics';
import BaseService  from "./BaseService";

 export class ClinicsService extends BaseService {
    constructor(){
        super(Clinics)
    }
}

export default new ClinicsService();