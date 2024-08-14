import { nanoid } from "nanoid";
import categoryModel from "../../../DB/Models/categories/category.model.js";
import subCategoryModel from "../../../DB/Models/subCategory/subCategory.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { AppError } from "../../utils/errorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import slugify from "slugify";
import productModel from "../../../DB/Models/products/products.model.js";
import { apiFeatures } from "../../utils/apiFeatures.js";

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

        if(category._id!==subCategory.category){
            return next(new AppError("Sub Category does not belong to this category", 400))
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



// ====================================delete SubCategories===============================

export const deleteSubcategories = asyncHandler(async(req,res,next)=>{

    const{categoryId,subCategoryId}=req.params
    const category = await categoryModel.findById(categoryId)
    if(!category) {
        return next(new AppError("Category not found", 404));
        }
        const subCategory = await subCategoryModel.findById(subCategoryId)
        if(!subCategory) {
            return next(new AppError("Sub Category not found", 404));
            }
            if(category._id!==subCategory.category){
                return next(new AppError("Sub Category does not belong to this category", 400))
                }
        if(req.user.id!==subCategory.addedBy.toString()){
            return next(new AppError("You are not authorized to delete this sub category", 403))
        }

        await cloudinary.api.delete_resources_by_prefix(`Ecommerce/categories/${category.customId}/subCategories/${subCategory.customId}`)
        await cloudinary.api.delete_folder(`Ecommerce/categories/${category.customId}/subCategories/${subCategory.customId}`)

        // =======>delete products related to this sub category<======
        await productModel.deleteMany({subCategory:subCategoryId})

        await subCategoryModel.deleteOne({_id:subCategory._id})
        return res.status(200).json({message:"Sub Category deleted successfully"})
})


// ====================================get subCategories==================================
export const getSubCategories = asyncHandler(async(req,res,next)=>{
  
    const apiFeature = new apiFeaturesFeatures(subCategoryModel.find(),req.query).filter().select().sort().pagination().search()
   
    const subcategories = await apiFeature.mongooseQuery
    return res.status(200).json(subcategories)
})

// =====================================get single subCategory ============================
export const getSubCategory = asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    const subCategory = await subCategoryModel.findById(id).populate([
        {   path:"category",
            select:"name -_id"
            },
            {   path:"addedBy",
                select:`firstName lastName -_id`
                }
                ])
    if(!subCategory){
        return next(new AppError("Sub Category not found", 404))
    }
    return res.status(200).json(subCategory)
})