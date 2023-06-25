import * as Joi from "joi";

class PaymentValidation {
  createValidation() {
    return Joi.object({
      cardHolderName: Joi.string().required(),
      cardNumber: Joi.string().required(),
      cardExpirationDate: Joi.string().required(),
      cardCVV: Joi.string().required(),
      amount: Joi.string().required(),
      description: Joi.string(),
      clinic: Joi.number().required(),
      treatment: Joi.number().required(),
    });
  }
  updateValidation() {
    return Joi.object({
      cardHolderName: Joi.string().required(),
      cardNumber: Joi.string().required(),
      cardExpirationDate: Joi.string().required(),
      cardCVV: Joi.string().required(),
      amount: Joi.string().required(),
      description: Joi.string(),
      clinic: Joi.number().required(),
      treatment: Joi.number().required(),
    });
  }
}
export default new PaymentValidation();
