import * as Joi from "joi";

class DoctorsValidation {
  createValidation() {
    return Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      phone: Joi.string().required(),
      specialization: Joi.string().required(),
      treatments: Joi.array().items(Joi.number().min(1)).required(),
      clinic: Joi.any(),
    });
  }
  updateValidation() {
    return Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      phone: Joi.string().required(),
      specialization: Joi.string().required(),
      treatments: Joi.array().items(Joi.number().min(1)).required(),
      clinic: Joi.any(),
    });
  }
}
export default new DoctorsValidation();
