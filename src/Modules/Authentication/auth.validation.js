import Joi from "joi";


import { generalFiled } from "../../utils/generalFields.js";



export const signUp = {
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

    })
}

export const confirmEmail = {
params:Joi.object({
    token: Joi.string().required().messages({
      'string.empty': 'Token is required',
    }),
  })}

  export const resendEmail = {
    params:Joi.object({
        refToken: Joi.string().required().messages({
          'string.empty': 'Token is required',
        }),
      })}


export const login = {
        body: Joi.object({
            email:generalFiled.email.required(),
            password:generalFiled.password.required(),
      })}


      export const forgetPassword = {
        body: Joi.object({
            email:generalFiled.email.required(),
      })}

      export const resetPassword = {
        body: Joi.object({
            email:generalFiled.email.required(),
            password:generalFiled.password.required(),
            confirmPassword:generalFiled.rePassword.required(),
            OTP:Joi.string().required().messages({'string.empty': 'OTP is required'}),

      })}