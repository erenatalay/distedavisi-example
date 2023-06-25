import { Router } from 'express';
import UsersConstoller  from "../controller/user";
import authenticate  from "../middlewares/authenticate";
import validate  from"../middlewares/validate" ;
import TreatmentsValidation from "../validations/treatments"
import { idChecker } from '../middlewares/idCheck';
import treatments from '../controller/treatments';
class TreatmentsRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`/`,authenticate, treatments.gets);
        this.router.get(`/:id`,authenticate,idChecker(), treatments.find);
        this.router.get(`/doctors/:id`,authenticate,idChecker(), treatments.getDoctorTreatment);
        this.router.post(`/`,authenticate,validate(TreatmentsValidation.createValidation()), treatments.create);
        this.router.put(`/:id`,authenticate,idChecker(),validate(TreatmentsValidation.updateValidation()), treatments.update);
        this.router.delete(`/:id`,authenticate,idChecker(), treatments.delete);
    }
}
const getRouter = new TreatmentsRouter()

export default  getRouter.router;