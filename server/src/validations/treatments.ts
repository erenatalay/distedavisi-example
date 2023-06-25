import * as Joi from "joi";
class TreatmentsValidation {
  createValidation() {
    return Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.string().required(),
    });
  }

  updateValidation() {
    return Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.string().required(),

    });
  }
}
export default new TreatmentsValidation();
