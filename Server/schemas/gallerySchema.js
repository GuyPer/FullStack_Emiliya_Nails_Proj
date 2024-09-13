const Joi = require('joi');

const validationOptions = {
  stripUnknown:true,
  abortEarly:false,
}

const schemas = {
  createNewGalleryImage:
    Joi.object().keys({
      title: Joi.string().required(),
      image: Joi.object().keys({
        url: Joi.string().required(),
        alt: Joi.string().optional(),
      }),
    }).options(validationOptions),
  updateGalleryImage:
  Joi.object().keys({
    title: Joi.string().optional(),
    image: Joi.object().keys({
      url: Joi.string().optional(),
      alt: Joi.string().optional(),
    }),
  }).options(validationOptions).min(1).message("The request's body must include at-least one valid key")
}

module.exports = schemas;