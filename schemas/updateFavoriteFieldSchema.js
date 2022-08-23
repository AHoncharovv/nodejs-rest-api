const Joi = require("joi");

const updateFavoriteFieldSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

module.exports = updateFavoriteFieldSchema;