import Joi from "joi";
import { generalFiled, headers } from "../../utils/generalFields.js";

export const addUser = {
    body:Joi.object({
    firstName:generalFiled.name.required(),
    lastName:generalFiled.name.required(),
    email:generalFiled.email.required(),
    password:generalFiled.password.required(),
    confirmPassword:generalFiled.rePassword.required(),
    gender:Joi.string().valid("male", "female").required(),
    age:Joi.number().integer().min(18).max(100).required(),
    phone:Joi.string().pattern(new RegExp("^[0-9]{11}$")).required().messages({
        "string.pattern.base":"Mobile number must be 10 digits long",
        "any.required":"Mobile number is required"
    }),
    birthDate:Joi.date().required().messages({
        "any.required":"Date of birth is required",
        "date.min":"Maximum age is 60",
        "date.max":"Minimum age is 18"
    }),
    addresses:Joi.array().items(
        Joi.object({
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
        })
      )

}),
headers:generalFiled.headers.required()

}


export const updateUser={body:Joi.object({
    firstName:generalFiled.name,
    lastName:generalFiled.name,
    email:generalFiled.email,
    password:generalFiled.password,
    confirmPassword:generalFiled.rePassword,
    gender:Joi.string().valid("male", "female"),
    age:Joi.number().integer().min(18).max(100),
    phone:Joi.string().pattern(new RegExp("^[0-9]{11}$")).messages({
        "string.pattern.base":"Mobile number must be 10 digits long",
        "any.required":"Mobile number is required"
    }),
    birthDate:Joi.date().messages({
        "any.required":"Date of birth is required",
        "date.min":"Maximum age is 60",
        "date.max":"Minimum age is 18"
    }),
    addresses:Joi.array().items(
        Joi.object({
          city: Joi.string().trim().messages({
            'string.empty': 'City is required',
          }),
          state: Joi.string().trim().messages({
            'string.empty': 'State is required',
          }),
          street: Joi.string().trim().messages({
            'string.empty': 'Street is required',
          }),
          buildingNumber: Joi.string().trim().messages({
            'string.empty': 'Building number is required',
          }),
          flatNumber: Joi.string().trim().messages({
            'string.empty': 'Flat number is required',
          }),
          zipCode: Joi.string().trim().messages({
            'string.empty': 'Zip is required',
          }),
        })
      )

}),
headers:generalFiled.headers.required()
}

export const deleteUser={
    headers:generalFiled.headers.required(),
    params:Joi.object({
        id:generalFiled.id.required()
        })
}


export const getProfile={
    params:Joi.object({
        id:generalFiled.id.required()
    })
}

export const updateUserPassByAdmin = {
    headers: generalFiled.headers.required(),
    params: Joi.object({
        id: generalFiled.id.required()
        }),
    body:Joi.object({
        password:generalFiled.password.required(),
        confirmPassword:generalFiled.rePassword.required()
    })
}


export const adminApplication = {
    headers: generalFiled.headers.required(),

}


export const getAllUsers = {
    headers: generalFiled.headers.required()
}