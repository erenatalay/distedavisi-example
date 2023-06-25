import * as Joi from "joi";

class ClinicsValidation {
  createValidation() {
    return Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        contactNumber: Joi.string().required(),
        commissionRate: Joi.number().required(),
        
    });
  }

  updateValidation() {
    return Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        contactNumber: Joi.string().required(),
        commissionRate: Joi.number().required(),
        
    });
  }
}
export default new ClinicsValidation();
