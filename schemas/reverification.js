const Joi = require("joi");

const reverification = Joi.object({
    email: Joi.string().required(),
});

module.exports = reverification;