import Joi from "joi";
import { generalFiled, headers } from "../../utils/generalFields.js";



export const addCoupon = {
    body: Joi.object({
        code:Joi.string().required(),
        amount:Joi.number().required(),
        startDate:Joi.date().required(),
        endDate:Joi.date().required(),
    }),
    headers:generalFiled.headers.required()
}


export const updateCoupon = {
    body: Joi.object({
        code:Joi.string(),
        amount:Joi.number(),
        startDate:Joi.date(),
        endDate:Joi.date(),
        }),
    headers:generalFiled.headers.required(),
    params:Joi.object({
        id:generalFiled.id.required()
        })
}
export const deleteCoupon = {
    headers:generalFiled.headers.required(),
    params:Joi.object({
        id:generalFiled.id.required()
        })
        }


export const getAllCoupons = {
    headers:generalFiled.headers.required(),
}

export const getSingleCoupon={
    headers:generalFiled.headers.required(),
    params:Joi.object({
        id:generalFiled.id.required()
        })
}