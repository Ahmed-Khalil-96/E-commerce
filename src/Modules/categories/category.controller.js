import slugify from "slugify";
import categoryModel from "../../../DB/Models/categories/category.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { AppError } from "../../utils/errorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { nanoid } from "nanoid";

export const createCategory = asyncHandler(async(req,res,next)=>{
    const {name}=req.body
    const categoryExist = await categoryModel.findOne({name:name.toLowerCase()})
    if(categoryExist){
        return next(new AppError("Category already exists",409))
    }
    if(!req.file){
        return next(new AppError("Please upload a category image",400))
    }

    const customId= nanoid(5)
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder:`Ecommerce/categories/${customId}`
    })
    const slug = slugify(name,{
        lower:true
    })

    const category = await categoryModel.create({name,addedBy:req.user.id,slug,image:{secure_url,public_id,customId}})
    return res.status(201).json({message:"Category created successfully",category})
})