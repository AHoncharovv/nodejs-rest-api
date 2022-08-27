const { Schema, model } = require('mongoose');
const Joi = require("joi");

const { handleSchemaValidationErrors } = require('../helpers');

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false });

contactSchema.post('save', handleSchemaValidationErrors)

const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
});

const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    add: contactAddSchema
};