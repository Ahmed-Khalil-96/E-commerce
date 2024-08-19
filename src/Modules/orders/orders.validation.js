import Joi from "joi";
import { generalFiled, headers } from "../../utils/generalFields.js";


export const createOrder = {
    body: Joi.object(
       { address:  Joi.object({
            city: Joi.string().trim().required().messages({
              'string.empty': 'City is required',
            }),
            state: Joi.string().trim().required().messages({
              'string.empty': 'State is required',
            }),
            street: Joi.string().trim().required().messages({
              'string.empty': 'Street is required',
            }),
            buildingNumber: Joi.string().trim().required().messages({
              'string.empty': 'Building number is required',
            }),
            flatNumber: Joi.string().trim().required().messages({
              'string.empty': 'Flat number is required',
            }),
            zipCode: Joi.string().trim().required().messages({
              'string.empty': 'Zip is required',
            }),
          })}
    ),
    headers:generalFiled.headers.required()
}



export const checkOut={
    body: Joi.object({
        address:  Joi.object({
            city: Joi.string().trim().required().messages({
              'string.empty': 'City is required',
            }),
            state: Joi.string().trim().required().messages({
              'string.empty': 'State is required',
            }),
            street: Joi.string().trim().required().messages({
              'string.empty': 'Street is required',
            }),
            buildingNumber: Joi.string().trim().required().messages({
              'string.empty': 'Building number is required',
            }),
            flatNumber: Joi.string().trim().required().messages({
              'string.empty': 'Flat number is required',
            }),
            zipCode: Joi.string().trim().required().messages({
              'string.empty': 'Zip is required',
            })
            })
    }),
    headers: generalFiled.headers.required()
}

export const getOwnOrders={
    headers: generalFiled.headers.required()

}

export const getAllOrders={
    headers: generalFiled.headers.required()
}

export const cancelOrder={
    params: Joi.object({
        id:generalFiled.id.required()
        }),
    headers: generalFiled.headers.required()
}


export const getUserOrders = {
    headers: generalFiled.headers.required(),
    params:Joi.object({
      userId:generalFiled.id.required()
    })
}