import { Router } from "express";
import UserRouter from "./user";
import DoctorsRouter from "./doctors";
import ClinicsRouter from "./clinics";
import TreatmentsRouter from "./treatments";
import PaymentRouter from "./payment";
import LinkPaymentRouter from "./linkPayment";
import AppointmentRouter from "./appointment";

class MainRouter {
  public router = Router();
  constructor() {
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {
    this.router.use(`/user`, UserRouter);
    this.router.use(`/doctors`, DoctorsRouter);
    this.router.use(`/clinics`, ClinicsRouter);
    this.router.use(`/treatments`, TreatmentsRouter);
    this.router.use(`/payment`, PaymentRouter);
    this.router.use(`/linkpayment`, LinkPaymentRouter);
    this.router.use(`/appointment`, AppointmentRouter);
  }
}
const getRouter = new MainRouter();
export default getRouter.router;
