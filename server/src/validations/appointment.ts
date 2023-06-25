import * as Joi from "joi";

class AppointmentValidation {
  createValidation() {
    return Joi.object({
      dateTime: Joi.date().required(),
      clinic: Joi.number().required(),
      treatment: Joi.number().required(),
      doctor: Joi.number().required(),
      payment: Joi.number(),
      linkPayment: Joi.number(),
    });
  }

  updateValidation() {
    return Joi.object({
      dateTime: Joi.date().required(),
      status: Joi.string().required(),
    });
  }
}
export default new AppointmentValidation();
