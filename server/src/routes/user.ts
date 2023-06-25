import { Router } from 'express';
import user  from "../controller/user";
import authenticate  from "../middlewares/authenticate";
import validate  from"../middlewares/validate" ;
import UserValidation from "../validations/user"
class UserRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.put(`/`,authenticate,validate(UserValidation.updateValidation()) ,user.updateUser);
        this.router.delete(`/`,authenticate ,user.deleteUser);
        this.router.post(`/register`,validate(UserValidation.createValidation()) ,user.createUser);
        this.router.post(`/login`,validate(UserValidation.loginValidation()), user.login);
        this.router.get(`/me`,authenticate, user.getUser);
        this.router.put(`/change-password`, validate(UserValidation.changePasswordValidation()),authenticate, user.changePassword);
    }
}
const getRouter = new UserRouter()

export default  getRouter.router;