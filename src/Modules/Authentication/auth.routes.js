import { Router } from "express";
import * as AC from "./auth.controller.js";
import { validation } from "../../Middlewares/validation.js";
import * as AV from "./auth.validation.js";



const authRouter = Router()


authRouter.post("/",AC.signUp, validation(AV.signUp))
authRouter.get("/confirmEmail/:token",AC.confirmEmail,validation(AV.confirmEmail))
authRouter.get("/refToken/:refToken", AC.resendEmail, validation(AV.resendEmail))
authRouter.post("/login",AC.login,validation(AV.login))
authRouter.patch("/forgetPassword",AC.forgetPassword,validation(AV.forgetPassword))
authRouter.patch("/resetPassword", AC.resetPassword,validation(AV.resetPassword))
export default authRouter