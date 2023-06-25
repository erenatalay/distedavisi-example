import { Router } from 'express';
import authenticate  from "../middlewares/authenticate";
import validate  from"../middlewares/validate" ;
import DoctorsValidation from "../validations/doctors"
import { idChecker } from '../middlewares/idCheck';
import doctors from '../controller/doctors';
class DoctorRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`/`,authenticate, doctors.gets);
        this.router.get(`/:id`,authenticate,idChecker(), doctors.find);
        this.router.get(`/clinics/:id`,authenticate,idChecker(), doctors.getClinicDoctor);
        this.router.post(`/`,authenticate,validate(DoctorsValidation.createValidation()), doctors.create);
        this.router.put(`/:id`,authenticate,idChecker(),validate(DoctorsValidation.updateValidation()), doctors.update);
        this.router.delete(`/:id`,authenticate,idChecker(), doctors.delete);
        this.router.put(`/update-image/:id`,authenticate, doctors.updateImage);
    }
}
const getRouter = new DoctorRouter()

export default  getRouter.router;