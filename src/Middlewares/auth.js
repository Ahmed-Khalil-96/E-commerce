import jwt from "jsonwebtoken";
import { AppError } from "../utils/errorClass.js";
import { asyncHandler } from "../utils/errorHandling.js";
import userModel from "../../DB/Models/user/user.Model.js";

 const auth = (roles =[])=>{
    return asyncHandler (async(req,res,next)=>{

        const {token}=req.headers
        if(!token){
            return next(new AppError("Please login first",400))
        }
        if(!token.startsWith(process.env.bearer_key)){
            return next(new AppError("Invalid token",400))
        }
        const newToken = token.split(process.env.bearer_key)[1]
        const decoded = jwt.verify(newToken,process.env.loginToken)
        if(!decoded?.email){
            return next(new AppError("Invalid Token",400))
        }
        const user = await userModel.findOne({email:decoded.email})
        if(!user){
            return next(new AppError("Invalid Token",400))
        }

        if(!roles.includes(user.role)){
            return next(new AppError("You are not authorized to perform this action ",403))
        }
        if(parseInt(user.passwordChangedAt.getTime()/1000)> decoded.iat){
            user.loggedIn=false
            await user.save()
            return next(new AppError("Your password has been changed, please login again",401))
            
        }
        req.user=user 
        next()
    }
)}


export default auth