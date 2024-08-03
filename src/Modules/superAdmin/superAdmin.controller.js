import adminApplicationModel from "../../../DB/Models/user/applicationForAdmin.model.js";
import userModel from "../../../DB/Models/user/user.Model.js";
import { AppError } from "../../utils/errorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";


export const adminApproval = asyncHandler(async(req,res,next)=>{
    const {id} = req.params;
    const userExist = await userModel.findById(id)
    if(!userExist){
        return next(new AppError("user not found",404))
        }
        if(req.user.role!=="superAdmin"){
            return next(new AppError("you are not authorized to perform this action",403))
        }
        if(userExist.role =="admin"){
            return next(new AppError("user is already an admin",404))
        }
        userExist.role = "admin"
        await userExist.save()
        await adminApplicationModel.findOneAndDelete({user:id})
        return res.status(200).json({message:"user approved as admin"})

})