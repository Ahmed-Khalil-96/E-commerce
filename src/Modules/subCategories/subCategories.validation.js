import Joi from "joi";
import { generalFiled, headers } from "../../utils/generalFields.js";


export const createSubCategory = {
    body:Joi.object({
        name:generalFiled.name.required(),
        file:Joi.object({
        image:generalFiled.file.required()
        }).required()
    }),
    headers:generalFiled.headers.required(),
    params:Joi.object({
        categoryId:generalFiled.id.required()
    })
}

export const updateSubCategory = {
    body:Joi.object({
        name:generalFiled.name,
        file:Joi.object({
            image:generalFiled.file
                })
    }),
    headers:generalFiled.headers.required(),
    params:Joi.object({
        categoryId:generalFiled.id.required(),
        subCategoryId:generalFiled.id.required()
    })
}

export const deleteSubCategory = {
    headers:generalFiled.headers.required(),
    params:Joi.object({
        categoryId:generalFiled.id.required(),
        subCategoryId:generalFiled.id.required()
        })
}


export const getSingleSubCategory = {
    params:Joi.object({
        id:generalFiled.id.required()
        })
}