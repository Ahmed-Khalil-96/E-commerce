import { Router } from "express";
import * as AC from "./auth.controller.js";
import { validation } from "../../Middlewares/validation.js";
import * as AV from "./auth.validation.js";



const authRouter = Router()


authRouter.post("/",validation(AV.signUp),AC.signUp)
authRouter.get("/confirmEmail/:token",validation(AV.confirmEmail),AC.confirmEmail)
authRouter.get("/refToken/:refToken", validation(AV.resendEmail), AC.resendEmail)
authRouter.post("/login",AC.login,validation(AV.login))
authRouter.patch("/forgetPassword",validation(AV.forgetPassword),AC.forgetPassword)
authRouter.patch("/resetPassword",validation(AV.resetPassword), AC.resetPassword)
export default authRouter