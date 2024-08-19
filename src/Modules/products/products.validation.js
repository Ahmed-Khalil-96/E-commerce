import Joi from "joi";
import { generalFiled, headers } from "../../utils/generalFields.js";


export const addProduct = {
    body:Joi.object({
        title:Joi.string().min(3).max(50).required(), 
        description:Joi.string().min(10).required(), 
        price:Joi.number().min(1).integer().required(), 
        discount:Joi.number().min(1).max(100), 
        category:generalFiled.id.required(), 
        subCategory:generalFiled.id.required(),
        brand:generalFiled.id.required(),
        stock:Joi.number().integer().required(),
       
    }),
    files:Joi.object({
        image:Joi.array().items(generalFiled.file.required()).required().messages({
            "any.required": "Image is required",
            }),
        
        coverImages:Joi.array().items(generalFiled.file.required()).required().messages({
            "any.required": "Cover Images is required",
        }) 
    }),
    headers:generalFiled.headers.required()
}

export const updateProduct = {
    body:Joi.object({
        title:Joi.string().min(3).max(50), 
        description:Joi.string().min(10), 
        price:Joi.number().min(1).integer(), 
        discount:Joi.number().min(1).max(100), 
        category:generalFiled.id, 
        subCategory:generalFiled.id,
        brand:generalFiled.id,
        stock:Joi.number().integer(),
        
    }),
    files:Joi.object({
        image:Joi.array().items(generalFiled.file),
        coverImages:Joi.array().items(generalFiled.file)
    }),
    headers:generalFiled.headers.required(),
    params:Joi.object({
        id:generalFiled.id.required()
        })
}


export const deleteProduct = { body:Joi.object({
    category:generalFiled.id, 
    subCategory:generalFiled.id,
    brand:generalFiled.id,
   
}),
headers:generalFiled.headers.required(),
params:Joi.object({
    id:generalFiled.id.required()
    })
}

export const getSingleProduct = {
    params:Joi.object({
        id:generalFiled.id.required()
    })
}