const Joi = require('joi');

const validationOptions = {
  stripUnknown:true,
  abortEarly:false,
}

const schemas = {
  createNewProduct:
    Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.object().keys({
        url: Joi.string().required(),
        alt: Joi.string().optional(),
      }),
      price: Joi.number().required(),
    }).options(validationOptions),
  updateProduct:
  Joi.object().keys({
    title: Joi.string().optional(),
    description: Joi.string().required(),
    image: Joi.object().keys({
      url: Joi.string().optional(),
      alt: Joi.string().optional(),
    }),
    price: Joi.number().required(),
  }).options(validationOptions).min(1).message("The request's body must include at-least one valid key")
}

module.exports = schemas;