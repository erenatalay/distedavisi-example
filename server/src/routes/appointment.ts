import { Router } from "express";
import authenticate from "../middlewares/authenticate";
import validate from "../middlewares/validate";
import AppointmentValidation from "../validations/appointment";
import { idChecker } from "../middlewares/idCheck";
import appointment from "../controller/appointment";
class AppointmentRouter {
  public router = Router();
  constructor() {
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {
    this.router.get(`/`, authenticate, appointment.gets);
    this.router.get(`/:id`, authenticate, idChecker(), appointment.find);
    this.router.post(`/`, authenticate, validate(AppointmentValidation.createValidation()),appointment.create);
    this.router.put(`/:id`, authenticate, idChecker(),validate(AppointmentValidation.updateValidation()), appointment.update);
    this.router.delete(`/:id`, authenticate, idChecker(), appointment.delete);
  }
}
const getRouter = new AppointmentRouter();

export default getRouter.router;
