import { Router } from 'express';
import authenticate  from "../middlewares/authenticate";
import validate  from"../middlewares/validate" ;
import LinkPaymentValidation from "../validations/linkpayment"
import { idChecker } from '../middlewares/idCheck';
import linkPayment from '../controller/linkPayment';
class LinkPaymentRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`/`,authenticate, linkPayment.gets);
        this.router.get(`/:id`,authenticate,idChecker(), linkPayment.find);
        this.router.post(`/`,authenticate,validate(LinkPaymentValidation.createValidation()), linkPayment.create);
        this.router.put(`/:id`,authenticate,idChecker(),validate(LinkPaymentValidation.updateValidation()), linkPayment.update);
        this.router.delete(`/:id`,authenticate,idChecker(), linkPayment.delete);
    }
}
const getRouter = new LinkPaymentRouter()

export default  getRouter.router;