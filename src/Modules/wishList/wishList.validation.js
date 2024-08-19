import Joi from "joi";
import { generalFiled, headers } from "../../utils/generalFields.js";

export const addToWishList = {
    params:Joi.object({
        productId:generalFiled.id.required()
    }),
    headers:generalFiled.headers.required(),
}



export const removeFromWishList = {
    params:Joi.object({
        productId:generalFiled.id.required()
        }),
        headers:generalFiled.headers.required(),
}

export const getWishList = {
    headers:generalFiled.headers.required(),
    
}