import { nanoid } from "nanoid";
import categoryModel from "../../../DB/Models/categories/category.model.js";
import subCategoryModel from "../../../DB/Models/subCategory/subCategory.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { AppError } from "../../utils/errorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import slugify from "slugify";

// =============================createSubCategory==========================

export const createSubCategory = asyncHandler(async(req,res,next)=>{
    const {name}=req.body;
    const {categoryId}= req.params
    const category = await categoryModel.findById(categoryId);
    
    if(!category) {
        return next(new AppError("Category not found", 404));
        }
        const subCategory = await subCategoryModel.findOne({name})
        if(subCategory){
            return next(new AppError("Sub Category already exists", 400))
        }
        if(!req.file){
            return next(new AppError("Please upload an image", 400))
        }
        const customId =nanoid(5)
        const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
            folder:`Ecommerce/categories/${category.customId}/subCategories/${customId}`
        })
        const slug = slugify(name,{
            lower:true
        })

     await subCategoryModel.create({name,slug,category:categoryId,addedBy:req.user.id,customId,image:{secure_url,public_id}})
     return res.status(201).json({message:"Sub Category created successfully"})
})



// ================================updateSubCategory==========================================
export const updateSubCategory = asyncHandler(async(req,res,next)=>{
    const {categoryId , subCategoryId}=req.params
    const {name}=req.body;
    const category = await categoryModel.findById(categoryId)
    if(!category) {
        return next(new AppError("Category not found", 404));
    }
    const subCategory = await subCategoryModel.findById(subCategoryId)
    if(!subCategory) {
        return next(new AppError("Sub Category not found", 404));
        }
        if(subCategory.name === name){
            return next(new AppError("Sub Category name cannot be changed", 400))
        }
        if(await subCategoryModel.findOne({name})){
            return next(new AppError("Sub Category already exists", 400))
        }
        if(subCategory.addedBy.toString()!==req.user.id.toString()){
            return next(new AppError("You are not authorized to update this sub category", 403))
        }
        if(req.file){
            await cloudinary.uploader.destroy(subCategory.image.public_id)
            const {secure_url, public_id}= await cloudinary.uploader.upload(req.file.path,{
                folder:`Ecommerce/categories/${category.customId}/subCategories/${subCategory.customId}`
            })
            subCategory.image={secure_url,public_id}
        }
        const slug = slugify(name,{
            lower:true
        });
        subCategory.name=name
        subCategory.slug=slug
        await subCategory.save()
        return res.status(200).json({message:"Sub Category updated successfully"})
})


// ====================================get subCategories==================================
export const getSubCategories = asyncHandler(async(req,res,next)=>{
    const subcategories = await subCategoryModel.find({}).populate([
        {   path:"category",
            select:"name -_id"
        },
        {   path:"addedBy",
            select:`firstName lastName -_id`
        }
    ])
    return res.status(200).json(subcategories)
})