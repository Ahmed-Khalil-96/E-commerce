import Joi from "joi";
import { generalFiled, headers } from "../../utils/generalFields.js";


export const addReview = {
    body:Joi.object({
        rete:Joi.number().required(),
        comment:Joi.string().required(),
    }),
    params:Joi.object({
        productId:generalFiled.id.required()
        }),
    headers:generalFiled.headers.required()
}

export const deleteReview = {
    params:Joi.object({
        reviewId:generalFiled.id.required(),
        productId:generalFiled.id.required()
        }),
}


export const getProductReviews={
    params:Joi.object({
        productId:generalFiled.id.required()
        })
}