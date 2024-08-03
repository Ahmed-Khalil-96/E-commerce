import jwt from "jsonwebtoken";
import { AppError } from "../../utils/errorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import bcrypt from "bcrypt"
import userModel from "../../../DB/Models/user/user.Model.js";
import sendEmail from "../../services/sendEmail.js";
import { nanoid , customAlphabet} from "nanoid";
import adminApplicationModel from "../../../DB/Models/user/applicationForAdmin.model.js";





// ================================createUser====================================================


export const createUser= asyncHandler(async(req,res,next)=>{
    const {firstName, lastName , email, password, gender, phone, address, birthDate, age }=req.body
    const userExist = await userModel.findOne({email:email.toLowerCase()})
    if(userExist){
        return next(new AppError("User already exist", 409))
    } 
    if(req.user.role!=="superAdmin"&& req.user.role!=="admin"){
        return next(new AppError("You are not authorized to create user", 403))
    }
    if(req.body.role && req.body.role !=="user"){
        return next(new AppError("User role only is permitted", 400))
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
    
    const user = new userModel({firstName, lastName , email, password:hash, gender, phone, address, birthDate, age, role:"user"})
    await user.save()
  return res.status(201).json({message: "User created successfully", user})
})

// =================================updateUser====================================================
export const updateUser = asyncHandler(async(req,res,next)=>{
    const {id}= req.params
  
    const userExist = await userModel.findById(id)
    if(!userExist){
        return next(new AppError("User not found",404))
        }
        if(req.body.email){
            const user = await userModel.findOne({email:req.body.email.toLowerCase()})
            
            if(user){
                return next(new AppError("Email is already in use",400))
            }
    
        }
        if(userExist.role==="user"){
        if(req.user.id!==userExist._id.toString() && req.user.role!=="admin"&&req.user.role !=="superAdmin"){
            return next(new AppError("You are not allowed to update this user",401))
        }
        await userModel.updateOne({_id:id},req.body)
        res.status(200).json("done")
      }
      else if(userExist.role==="admin"){
        if(req.user.id!== userExist._id.toString() && req.user.role!=="superAdmin"){
            return next(new AppError("You are not allowed to update this user",401))
        }
        await userModel.updateOne({_id:id},req.body)
       return  res.status(200).json("done")
      }


})

// ===================================deleteUser=============================================
export const deleteUser = asyncHandler(async(req,res,next)=>{
    const {id}= req.params
    const userExist = await userModel.findById(id)
    if(!userExist){
        return next(new AppError("User not found",404))
        }   
        if(userExist.role =="user"){
        if(req.user.id!=userExist._id && req.user.role!=="admin" && req.user.role!=="superAdmin"){
            return next(new AppError("You are not allowed to delete this user",401))
            }
            await userModel.deleteOne({_id:id})
            res.status(200).json("done")
            }
            else if(userExist.role ==="admin"){
                if(req.user.id!==userExist._id.toString()&& req.user.role!=="superAdmin"){
                    return next(new AppError("You are not allowed to perform this action",401))
                }
                await userModel.deleteOne({_id:id})
                return res.status(200).json("done")
        }
    })
            
        
// =======================================getProfile===================================================
export const getProfile = asyncHandler(async(req,res,next)=>{
    const {id} =req.params
    const userExist = await userModel.findById(id).select("-password")
    if(!userExist){
        return next(new AppError("User not found",404))
        }
        if(userExist.role==="user"){
        if(req.user.id!==userExist._id.toString()&&req.user.role!=="admin" && req.user.role!=="superAdmin"){
            return next(new AppError("You are not allowed to view this user's profile",401))
        }
        res.status(200).json(userExist)
    }
    else if(userExist.role==="admin"){
        if(req.user.id!==userExist._id.toString() && req.user.role!=="superAdmin"){
            return next(new AppError("You are not allowed to view this user's profile",401))
            }
            return res.status(200).json(userExist)
            }

})


// ======================================updateUserPassByAdmin=============================================

// =============use hooks instead of this api =========
export const updateUserPassByAdmin = asyncHandler(async(req,res,next)=>{
    const {id}= req.params
    const {password}= req.body
    const userExist = await userModel.findById(id)
    if(!userExist){
        return next(new AppError("User not found",404))
        }   
      
        if(userExist.role==="admin"){
            return next(new AppError("You are not allowed to update this user's password",401))
        }
        const hash = bcrypt.hashSync(password,+process.env.saltRounds)
        userExist.password=hash
        await userExist.save()
        return res.status(200).json("done")
        })

// ===================================adminApplication=========================================================
export const adminApplication = asyncHandler(async(req,res,next)=>{
const userExist = await userModel.findById(req.user.id)
if(!userExist){
    return next(new AppError("User not found",404))
    }
    if(userExist.role =="admin"){
        return next(new AppError("You are admin already",401))
        }
        const adminApp = new adminApplicationModel({user:req.user.id,email:req.user.email,appliedAt:Date.now()})
        await adminApp.save()
        return res.status(201).json({msg:"application submitted successfully, waiting for approval"})


})
