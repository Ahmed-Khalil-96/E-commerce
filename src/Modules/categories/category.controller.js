import slugify from "slugify";
import categoryModel from "../../../DB/Models/categories/category.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { AppError } from "../../utils/errorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { nanoid } from "nanoid";
import subCategoryModel from "../../../DB/Models/subCategory/subCategory.model.js";
import productModel from "../../../DB/Models/products/products.model.js";
import { apiFeatures } from "../../utils/apiFeatures.js";


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




// ====================================deleteCategory=======================================

export const deleteCategory = asyncHandler(async(req,res,next)=>{

    const{id}=req.params
    const category = await categoryModel.findById(id)
    if(!category){
        return next(new AppError("Category not found",404))
        }
        if(req.user.id!==category.addedBy.toString()){
            return next(new AppError("You are not authorized to delete this category",403))
        }
        await cloudinary.api.delete_resources_by_prefix(`Ecommerce/categories/${category.customId}`)
        await cloudinary.api.delete_folder(`Ecommerce/categories/${category.customId}`)
        await productModel.deleteMany({category:id})
        await subCategoryModel.deleteMany({category:category._id})

        await categoryModel.deleteOne({_id:category._id})
        return res.status(200).json({message:"Category deleted successfully"})
})


// ====================================getAllCategories=====================================
export const getCategories = asyncHandler(async(req,res,next)=>{
    
    const apiFeature = new apiFeatures(categoryModel.find(),req.query).filter().select().sort().pagination().search()
    const categories = await apiFeature.mongooseQuery
    return res.status(200).json({categories})
})


// ====================================get specific category===============================
export const getCategory = asyncHandler(async(req,res,next)=>{
    const{id}=req.params
    const category = await categoryModel.findById(id).populate([{
        path:"subCategories",
        select:"name -_id -category"
    },{
        path:"addedBy",
        select:"firstName lastName -_id"
    }])
    if(!category){
        return next(new AppError("Category not found",404))
        }
        return res.status(200).json({category})
})