import slugify from "slugify";
import cloudinary from "../../utils/cloudinary.js";
import { AppError } from "../../utils/errorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { nanoid } from "nanoid";
import brandModel from "../../../DB/Models/brands/brands.model.js";
import productModel from "../../../DB/Models/products/products.model.js";
import { apiFeatures } from "../../utils/apiFeatures.js";


// =============================================createBrand===========================================
export const createBrand = asyncHandler(async(req,res,next)=>{
    const {name}= req.body
    const brandExist = await brandModel.findOne({name:name.toLowerCase()})
    if(brandExist){
        return next(new AppError("Brand already exist",400))
    }
    if(!req.file){
        return next(new AppError("Please upload a logo",400))
    }
    const customId = nanoid(5)
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
        folder:`Ecommerce/brands/${customId}`
    })
    req.filePath=`Ecommerce/brands/${customId}`
    const slug = slugify(name,{
        lower:true
    })
   const brand = await brandModel.create({name,slug,addedBy:req.user.id,image:{secure_url,public_id},customId})
   req.data={
    model:brandModel,
    id:brand._id
   }
    return res.status(201).json({message:"Brand created successfully",brand})
})



// =======================================updateBrand============================================
export const updateBrand = asyncHandler(async(req,res,next)=>{
    const {id}=req.params ;
    const {name}=req.body;
    let slug
    const brand = await brandModel.findById(id)
    if(!brand){
        return next(new AppError("Brand not found",404))
    }
    if(req.user.id.toString()!==brand.addedBy.toString()){
        return next(new AppError("You are not authorized to update this brand",403))
    }

    if(name){
    if(await brandModel.findOne({name:name.toLowerCase()})){
        return next(new AppError("Brand already exist",400))
    }
    brand.name=name;

}
    if(req.file){
        await cloudinary.uploader.destroy(brand.image.public_id)
        const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
            folder:`Ecommerce/brands/${brand.customId}`})
            brand.image={secure_url,public_id}
    }
   if(name){
     slug = slugify(name,{
        lower:true
    })
    brand.slug=slug

   }
    await brand.save()
    return res.status(200).json({message:"Brand updated successfully",brand})
})



// =================================delete brand======================================

export const deleteBrand = asyncHandler(async(req,res,next)=>{
    const {id }= req.params
    const brand = await brandModel.findById(id)
    if(!brand){
        return next(new AppError("Brand not found",404))
    }
    if(req.user.id.toString()!==brand.addedBy.toString()){
        return next(new AppError("You are not authorized to delete this brand",403))
    }
    const products = await productModel.find({brand:id})
   
    for(const product of products){
        const lastSlashIndex = product.image.public_id.lastIndexOf('/');
        const folderPath = product.image.public_id.substring(0, lastSlashIndex);
        await cloudinary.api.delete_resources_by_prefix(folderPath)
        await cloudinary.api.delete_folder(folderPath)
    }
    
    await productModel.deleteMany({brand:id})
    await brandModel.deleteOne({_id:id})
    await cloudinary.api.delete_resources_by_prefix(`Ecommerce/brands/${brand.customId}`)
    await cloudinary.api.delete_folder(`Ecommerce/brands/${brand.customId}`)
    return res.status(200).json({message:"Brand deleted successfully"})
})


// =====================================get All brands===========================================

export const getBrands = asyncHandler(async(req,res,next)=>{
  
    const apiFeature= new apiFeatures(brandModel.find(),req.query).filter().search().select().sort().pagination()
    const brands = await apiFeature.mongooseQuery
    return res.status(200).json({brands})
})


// ===================================get single brand========================================
export const getSingleBrand = asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    const brand = await brandModel.findById(id).populate({
        path:"addedBy",
        select:"firstName lastName -_id"
        })
    if(!brand){
        return next(new AppError("Brand not found",404))
        }
        return res.status(200).json({brand})    

})
