import Joi from "joi";
export const signUpValidator = Joi.object({
  userName: Joi.string().required().min(6).max(255).messages({
    "string.empty": "userName khong duoc de trong",
    "any.required": "userName la bat buoc",
    "string.min": "userName phai co it nhat {#limit} ky tu",
    "string.max": "userName phai co it hon {#limit + 1} ky tu",
  }),
  email: Joi.string().required().email().messages({
    "string.empty": "Email khong duoc de trong",
    "any.required": "Email la bat buoc",
    "string.email": "Email khong dung dinh dang",
  }),
  password: Joi.string().required().min(6).max(255).messages({
    "string.empty": "password khong duoc de trong",
    "any.required": "password la bat buoc",
    "string.min": "password phai co it nhat {#limit} ky tu",
    "string.max": "password phai co it hon {#limit + 1} ky tu",
  }),
  confirmPassword: Joi.string()
    .required()
    .min(6)
    .max(255)
    .valid(Joi.ref("password"))
    .messages({
      "string.empty": "confirmPassword khong duoc de trong",
      "any.required": "confirmPassword la bat buoc",
      "string.min": "confirmPassword phai co it nhat {#limit} ky tu",
      "string.max": "confirmPassword phai co it hon {#limit + 1} ky tu",
      "any.only": "confirmPassword khong khop voi password",
    }),
  role: Joi.string(),
});

export const signInValidator = Joi.object({
  email: Joi.string().required().email().messages({
    "string.empty": "Email khong duoc de trong",
    "any.required": "Email la bat buoc",
    "string.email": "Email khong dung dinh dang",
  }),
  password: Joi.string().required().min(6).max(255).messages({
    "string.empty": "password khong duoc de trong",
    "any.required": "password la bat buoc",
    "string.min": "password phai co it nhat {#limit} ky tu",
    "string.max": "password phai co it hon {#limit + 1} ky tu",
  }),
});
