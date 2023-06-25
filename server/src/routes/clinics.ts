import { Router } from 'express';
import UsersConstoller  from "../controller/user";
import authenticate  from "../middlewares/authenticate";
import validate  from"../middlewares/validate" ;
import ClinicsValidation from "../validations/clinics"
import { idChecker } from '../middlewares/idCheck';
import clinics from '../controller/clinics';
class ClinicRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`/`,authenticate, clinics.gets);
        this.router.get(`/:id`,authenticate,idChecker(), clinics.find);
        this.router.post(`/`,authenticate,validate(ClinicsValidation.createValidation()), clinics.create);
        this.router.put(`/:id`,authenticate,idChecker(),validate(ClinicsValidation.updateValidation()), clinics.update);
        this.router.delete(`/:id`,authenticate,idChecker(), clinics.delete);
    }
}
const getRouter = new ClinicRouter()

export default  getRouter.router;