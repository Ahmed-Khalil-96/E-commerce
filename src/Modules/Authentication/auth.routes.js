import { Router } from "express";
import * as AC from "./auth.controller.js";



const authRouter = Router()


authRouter.post("/",AC.signUp)
authRouter.get("/confirmEmail/:token",AC.confirmEmail)
authRouter.get("/refToken/:refToken", AC.resendEmail)
authRouter.post("/login",AC.login)
authRouter.patch("/forgetPassword",AC.forgetPassword)
authRouter.patch("/resetPassword", AC.resetPassword)
export default authRouter