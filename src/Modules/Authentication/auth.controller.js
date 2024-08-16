import jwt from "jsonwebtoken";
import { AppError } from "../../utils/errorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import bcrypt from "bcrypt"
import userModel from "../../../DB/Models/user/user.Model.js";
import sendEmail from "../../services/sendEmail.js";
import { nanoid , customAlphabet} from "nanoid";




// ==============================signUp====================================
export const signUp = asyncHandler(async(req,res, next)=>{
    const {firstName, lastName , email, password, gender, phone, addresses, birthDate, age }=req.body
    const userExist = await userModel.findOne({email:email.toLowerCase()})
    if(userExist){
        return next(new AppError("User already exist", 409))
    }

    const token = jwt.sign({email},process.env.confirmEmailToken)
    const link = `${req.protocol}://${req.headers.host}/user/confirmEmail/${token}`

    const refToken = jwt.sign({email},process.env.refreshToken_key)
    const refLink = `${req.protocol}://${req.headers.host}/user/refToken/${refToken}`

    const data = await sendEmail(email, "Confirm email", `<a href = ${link}>please click her to confirm your email</a> <br>
        <a href = ${refLink}>click here to resend verification link</a>`)
        if(!data){
            return next(new AppError("Failed to send email", 500))
            }
            const hash = bcrypt.hashSync(password,Number(process.env.saltRounds))
    
    const user = new userModel({firstName, lastName , email, password:hash, gender, phone, addresses, birthDate, age})
    await user.save()
    req.data={
        model:userModel,
        id:user._id
    }
    res.status(201).json({message: "User created successfully", user})
})

// ==================================confirm Email================================================================================
export const confirmEmail = asyncHandler(async(req, res,next)=>{

    const {token}=req.params
    const decoded = jwt.verify(token,process.env.confirmEmailToken)
    if(!decoded?.email){
        return next(new AppError("Invalid token", 401))
    }
    const user = await userModel.findOne({email:decoded.email,confirmed:false})
    if(!user){
        return next(new AppError("User not found or already confirmed", 404))
    }
    user.confirmed = true
    await user.save()
    res.status(200).json({message: "Email confirmed successfully"})
})

// ============================================resend Email===========================================================================================
export const resendEmail = asyncHandler(async(req, res, next)=>{
    const{refToken}=req.params
    const decoded = jwt.verify(refToken,process.env.refreshToken_key)
    if(!decoded?.email){
        return next(new AppError("Invalid token", 401))
    }
    const user = await userModel.findOne({email:decoded.email,confirmed:false})
    if(!user){
        return next(new AppError("User not found or already confirmed", 404))
        }
        const token = jwt.sign({email:decoded.email},process.env.confirmEmailToken, {expiresIn:60})
    const link = `${req.protocol}://${req.headers.host}/user/confirmEmail/${token}`
        const data = await sendEmail(decoded.email, "please confirm your email",`<a href= ${link}>please click here to confirm your email</a>`)
        if(!data){
            return next(new AppError("Failed to send email", 500))
            }
            return res.status(200).json("done")
})


// ==================================================login====================================================================

export const login = asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body
   
    const user = await userModel.findOne({email})
    if(!user){
        return next(new AppError("Invalid email or password", 401))
        }
        const hash = bcrypt.compareSync(password,user.password)
        if(!hash){
            return next(new AppError("Invalid email or password", 401))
            }

        if(!user.confirmed){
            return next(new AppError("Please confirm your email first", 401))
        }
        if(user.loggedIn){
            return next(new AppError("You are already logged in", 401))
        }
        const token = jwt.sign({email,id:user._id},process.env.loginToken)
        user.loggedIn= true
        await user.save()
        res.status(200).json({token})
})


// ====================================forgetPassword=====================================

export const forgetPassword = asyncHandler(async(req,res,next)=>{
    const {email}=req.body
    const user = await userModel.findOne({email:email.toLowerCase()})
    if(!user){
        return next(new AppError("Email is not found",404))
    }
    const code = customAlphabet("0123456789",5)
    const OTP = code()
    const data = await sendEmail(email,"reset password",`<p>please use this code ${OTP} to reset your password</p>`)
    if(!data){
        return next(new AppError("Failed to send email please try again",500))
    }
    user.OTP=OTP;
    user.OTPExpires=Date.now()+600000
    await user.save()
    res.status(200).json("done")
})



// =============================resetPassword=============================================

export const resetPassword = asyncHandler(async(req,res,next)=>{
    const {email,OTP,password}=req.body
    const user = await userModel.findOne({email:email.toLowerCase()})
    if(!user){
        return next(new AppError("Email is not found",404))
        }
        if(OTP!==user.OTP || OTP === ""){
            return next(new AppError("Invalid OTP",401))
        }
        if(Date.now()>user.OTPExpires){
            return next(new AppError("OTP has expired",401))
            }
        const hash = bcrypt.hashSync(password,+process.env.saltRounds)
        user.password=hash
        user.OTP=""
        user.OTPExpires=0
        user.passwordChangedAt=Date.now()
        await user.save()
        res.status(200).json("done")

})
