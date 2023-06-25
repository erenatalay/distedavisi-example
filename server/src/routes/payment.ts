import { Router } from 'express';
import authenticate  from "../middlewares/authenticate";
import validate  from"../middlewares/validate" ;
import PaymentValidation from "../validations/payment"
import { idChecker } from '../middlewares/idCheck';
import payment from '../controller/payment';
class PaymentRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`/`,authenticate, payment.gets);
        this.router.get(`/:id`,authenticate,idChecker(), payment.find);
        this.router.post(`/`,authenticate,validate(PaymentValidation.createValidation()), payment.create);
        this.router.put(`/:id`,authenticate,idChecker(),validate(PaymentValidation.updateValidation()), payment.update);
        this.router.delete(`/:id`,authenticate,idChecker(), payment.delete);
    }
}
const getRouter = new PaymentRouter()

export default  getRouter.router;