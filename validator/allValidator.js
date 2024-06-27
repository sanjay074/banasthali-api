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

  const studentJoiSchema = Joi.object({
    admissionFees:Joi.number().required().messages({
     'number.empty': 'Student admissionFees is required.',
      'any.required': 'Student admissionFees is required.',
    }),
    paymentDue:Joi.number(),
    urlImgae:Joi.string(),
    studentDetails: Joi.object({
      firstName: Joi.string().required().messages({
        'string.empty': 'Student first name is required.',
        'any.required': 'Student first name is required.',
      }),
      lastName: Joi.string().required().messages({
        'string.empty': 'Parent\'s last name is required.',
        'any.required': 'Parent\'s last name is required.',
      }),
      gender: Joi.string().valid('Male', 'Female').required().messages({
        'any.only': 'Gender must be either Male or Female.',
        'any.required': 'Gender is required.',
      }),
      studentId:Joi.string().required().messages({
        'string.empty': 'studentId is required.',
        'any.required': 'studentId is required.',
      }),
      rollNumber: Joi.string().required().messages({
        'string.empty': 'Roll number is required.',
        'any.required': 'Roll number is required.',
      }),
      dob: Joi.string().required().messages({
        'string.empty': 'Date of birth is required.',
        'any.required': 'Date of birth is required.',
      }),
      email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address.',
        'string.empty': 'Email is required.',
        'any.required': 'Email is required.',
      }),
      mobileNumber: Joi.string().required().messages({
        'string.empty': 'Mobile number is required.',
        'any.required': 'Mobile number is required.',
      }),
      address: Joi.string().required().messages({
        'string.empty': 'Address is required.',
        'any.required': 'Address is required.',
      }),
    }),
    parentDetails: Joi.object({
      firstName: Joi.string().required().messages({
        'string.empty': 'Parent\'s first name is required.',
        'any.required': 'Parent\'s first name is required.',
      }),
      lastName: Joi.string().required().messages({
        'string.empty': 'Parent\'s last name is required.',
        'any.required': 'Parent\'s last name is required.',
      }),
      mobileNumber: Joi.string().required().messages({
        'string.empty': 'Parent\'s mobile number is required.',
        'any.required': 'Parent\'s mobile number is required.',
      }),
    }),
    courseDetails: Joi.object({
      courseName: Joi.string().required().messages({
        'string.empty': 'Course name is required.',
        'any.required': 'Course name is required.',
      }),
      session: Joi.string().required().messages({
        'string.empty': 'Session is required.',
        'any.required': 'Session is required.',
      }),
    })
  });


const studentFeesJoiSchema = Joi.object({
  studentId: Joi.string().required().messages({
    'string.empty': 'student id is required.',
    'any.required': 'student id is required.',
  }),
  firstName: Joi.string().required().messages({
    'string.empty': 'First name is required.',
    'any.required': 'First name is required.',
  }),
  lastName: Joi.string().required().messages({
    'string.empty': 'Last name is required.',
    'any.required': 'Last name is required.',
  }),
  rollNumber: Joi.string().required().messages({
    'string.empty': 'Roll number is required.',
    'any.required': 'Roll number is required.',
  }),
  amount: Joi.number().default(0).messages({
    'number.base': 'Amount must be a number.',
  }),
  transactionId: Joi.string().required().messages({
    'string.base': 'Transaction ID must be a number.',
    'any.required': 'Transaction ID is required.',
  }),
  phoneNumber: Joi.string().required().messages({
    'string.empty': 'Phone number is required.',
    'any.required': 'Phone number is required.',
  }),
  
  paymentType: Joi.string().valid('cash', 'online').default('cash').messages({
    'any.only': 'Payment type must be either "cash" or "online".',
  }),
  status: Joi.string().valid('pending', 'completed', 'decline').default('completed').messages({
    'any.only': 'Status must be either "pending", "completed", or "decline".',
  }),
});

 module.exports= {
    registrationAminUserSchema,
    adminUserLoginSchema,
    studentJoiSchema,
    studentFeesJoiSchema
 } 