const Joi = require('joi')

// password rules: at least oupper case letter, at least olower case letter, at least onumber, at least one specicharacted, at least 7 charactetotal

const validationOptions = {
  stripUnknown:true,
  abortEarly:false,
}

const schemas = {
  createNewUser:
    Joi.object().keys({
      name: Joi.object().keys({
        first: Joi.string().required(),
        last: Joi.string().required(),
      }),
      phone: Joi.string().pattern(/^05\d{1}([-]{0,1})\d{7}$/, { name: 'cellphone number'}).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/, { name: 'password'}).required(),
      address: Joi.object().keys({
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.number().required(),
        zip: Joi.number().optional(),
      }),
    }).options(validationOptions),
  updateUser:
    Joi.object().keys({
          name: Joi.object().keys({
      first: Joi.string().optional(),
      last: Joi.string().optional(),
    }),
      phone: Joi.string().pattern(/^05\d{1}([-]{0,1})\d{7}$/, { name: 'cellphone number'}).optional(),
      password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/, { name: 'password'}).optional(),
      address: Joi.object().keys({
        city: Joi.string().optional(),
        street: Joi.string().optional(),
        houseNumber: Joi.number().optional(),
        zip: Joi.number().optional(),
      }),
    }).options(validationOptions).min(1).message("The request's body must include at-least one valid key"),
  login:
    Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/, { name: 'password'}).required(),
    }).options(validationOptions),
}

module.exports = schemas;