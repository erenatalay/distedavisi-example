import * as Joi from "joi"

class UserValidation {
  createValidation() {
    return Joi.object({
      firstname: Joi.string().required().min(3),
      lastname: Joi.string().required().min(3),
      password: Joi.string().required().min(8),
      confirm_password: Joi.string().valid(Joi.ref("password")).required().messages({'any.only': `The two passwords are not compatible`}),
      email: Joi.string().email().required(),
      birthday: Joi.date().required(),
    });
  }
  loginValidation() {
    return Joi.object({
      password: Joi.string().required().min(8),
      email: Joi.string().email().required(),
    });
  }
  updateValidation(){
    return Joi.object({
      firstname: Joi.string().required().min(3),
      lastname: Joi.string().required().min(3),
      email: Joi.string().email().required(),
      birthday: Joi.date(),
    });
  }
  changePasswordValidation(){
    return Joi.object({
      password: Joi.string().required().min(8),
      confirm_password: Joi.string().valid(Joi.ref("password")).required().messages({'any.only': `The two passwords are not compatible`}),
    });
  }
}
export default new UserValidation();
