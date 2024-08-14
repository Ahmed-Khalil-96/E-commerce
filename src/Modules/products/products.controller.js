import slugify from "slugify";
import categoryModel from "../../../DB/Models/categories/category.model.js";
import cloudinary from "../../utils/cloudinary.js";
import subCategoryModel from "../../../DB/Models/subCategory/subCategory.model.js";
import productModel from "../../../DB/Models/products/products.model.js";
import brandModel from "../../../DB/Models/brands/brands.model.js";
import { AppError } from "../../utils/errorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { nanoid } from "nanoid";
import { apiFeatures } from "../../utils/apiFeatures.js";

// ==================================addProduct======================================
export const addProduct = asyncHandler(async (req, res,next) => {
    const {title, description, price, discount , category, subCategory ,brand,stock}=req.body

    const categoryExist = await categoryModel.findById(category)
    if(!categoryExist){
    return next(new AppError("Category not found", 404))
    }

    const subCategoryExist = await subCategoryModel.findOne({_id:subCategory,category})
        if(!subCategoryExist){
            return next(new AppError("Sub Category not found", 404))
            }
    const brandExist = await brandModel.findById(brand)
        if(!brandExist){
            return next(new AppError("Brand not found", 404))
        }
    
  const subPrice= price-(price* (discount||0)/100)

    if(!req.files){
        return next(new AppError("Please add product image and cover images", 404))
    }
   const customId = nanoid(5)
    const {secure_url, public_id}= await cloudinary.uploader.upload(req.files.image[0].path,{
        folder:`Ecommerce/categories/${categoryExist.customId}/subCategories/${subCategoryExist.customId}/products/${customId}`
    })
    const list =[]
    for(const file of req.files.coverImages){
        const {secure_url,public_id}= await cloudinary.uploader.upload(file.path,{
            folder:`Ecommerce/categories/${categoryExist.customId}/subCategories/${subCategoryExist.customId}/products/${customId}`,
        
        })
        list.push({secure_url,public_id})
    }
   const slug = slugify(title,{
        lower:true
    })
    const product = await productModel.create({title,description,price,stock,category,brand,subCategory,image:{secure_url,public_id}, coverImages:list,customId,subPrice,discount,slug,addedBy:req.user.id})
    return res.status(201).json({message:"Product added successfully",product})
})



// ========================================get all products =========================================
export const getProducts = asyncHandler(async(req,res,next)=>{

const apiFeature = new apiFeatures(productModel.find(),req.query).search().select().pagination().filter().sort()

const products = await apiFeature.mongooseQuery
return res.status(200).json({products})
})





// =======================================get single product============================================
export const getSingleProduct = asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    const product = await productModel.findById(id).populate([{
        path:"category",
        select:"name  -_id"
    },
    {
        path:"subCategory",
        select:"name -_id"
    },
    {
        path:"brand",
        select:"name -_id"
    },
    {
        path:"addedBy",
        select:"firstName lastName -_id"
    }
])
if(!product){
    return next(new AppError("product is not found",400))
}
return res.status(200).json({product})

})