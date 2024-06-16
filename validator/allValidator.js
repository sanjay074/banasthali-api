const Joi = require("joi");
const { models, model } = require("mongoose");
const passwordSchema = Joi.string()
.min(8)
.max(30)
.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$'))
.required()
.messages({
  'string.pattern.base': 'Password must be between 8-30 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  'string.min': 'Password must be at least 8 characters long.',
  'string.max': 'Password must not exceed 30 characters.',
  'any.required': 'Password is required.'
})

const registrationAminUserSchema = Joi.object({ 
  email: Joi.string().required(),
  password: passwordSchema,
});

const adminUserLoginSchema =Joi.object({
    email: Joi.string(),
    password: passwordSchema,
  })


 module.exports= {
    registrationAminUserSchema,
    adminUserLoginSchema
 } 