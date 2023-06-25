import * as Joi from "joi";

class LinkPaymentValidation {
  createValidation() {
    return Joi.object({
      paymentLink: Joi.string().required(),
      amount: Joi.string().required(),
      description: Joi.string(),
      clinic: Joi.number().required(),
      treatment: Joi.number().required(),
    });
  }
  updateValidation() {
    return Joi.object({
      paymentLink: Joi.string().required(),
      amount: Joi.string().required(),
      description: Joi.string(),
      clinic: Joi.number().required(),
      treatment: Joi.number().required(),
    });
  }
}
export default new LinkPaymentValidation();
