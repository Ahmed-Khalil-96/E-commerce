import Joi from "joi";
import { generalFiled, headers } from "../../utils/generalFields.js";


export const createCategory = {
    body:Joi.object({
        name:generalFiled.name.required(),
        
    }),
    file:Joi.object({
        image:generalFiled.file.required()
    }),
    headers:generalFiled.headers.required()
}

export const updateCategory = {
    body:Joi.object({
        name:generalFiled.name,
        file:Joi.object({
            image:generalFiled.file
                })
    }),
    headers:generalFiled.headers.required(),
    params:Joi.object({
        id:generalFiled.id.required()
    })
}

export const deleteCategory = {
    headers:generalFiled.headers.required(),
    params:Joi.object({
        id:generalFiled.id.required()
        })
}


export const getSingleCategory = {
    params:Joi.object({
        id:generalFiled.id.required()
        })
}