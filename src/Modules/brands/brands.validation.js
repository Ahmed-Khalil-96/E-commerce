import Joi from "joi";
import { generalFiled, headers } from "../../utils/generalFields.js";


export const createBrand = {
    body: Joi.object({
        name: generalFiled.name.required(),
        file:Joi.object({
            image: generalFiled.file.required(),
        }),
    }),


   
    headers:generalFiled.headers.required()
}

export const updateBrand = {
    body:Joi.object({
        name:generalFiled.name,
        file:Joi.object({
            image:generalFiled.file,
        })
    }),
    params:Joi.object({
        id:generalFiled.id.required(),
    }),
    headers:generalFiled.headers.required(),

 
}

export const deleteBrand = {
    params:Joi.object({
        id:generalFiled.id.required(),
    }),
    headers:generalFiled.headers.required(),
}

export const getSingleBrand = {
    params:Joi.object({
        id:generalFiled.id.required(),
        }),
}