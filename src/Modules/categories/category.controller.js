import slugify from "slugify";
import categoryModel from "../../../DB/Models/categories/category.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { AppError } from "../../utils/errorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { nanoid } from "nanoid";


// ===========================createCategory=======================================
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

    const category = await categoryModel.create({name,addedBy:req.user.id,slug,image:{secure_url,public_id},customId})
    return res.status(201).json({message:"Category created successfully",category})
})

// ========================================updateCategory=======================================

export const updateCategory= asyncHandler(async(req, res,next)=>{
    const {name}=req.body
    const {id}=req.params
    const category = await categoryModel.findById(id)
    if(!category){
        return next(new AppError("Category not found",404))
        }
        if(req.user.id!==category.addedBy.toString()){
            return next(new AppError("You are not authorized to update this category",403))
        }
        if(name===category.name){
            return next(new AppError("Category name cannot be the same",400))
        }
        if(await categoryModel.findOne({name:name.toLowerCase()})){
            return next(new AppError("Category already exists",409))
        }
        if(req.file){
            await cloudinary.uploader.destroy(category.image.public_id)
            const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
                folder:`Ecommerce/categories/${category.customId}`})
                category.image={secure_url,public_id}
        }
        const slug =slugify(name,{
            lower:true,
        })

        category.name = name
        category.slug = slug
       
        await category.save()
        return res.status(200).json({message:"Category updated successfully",category})
})