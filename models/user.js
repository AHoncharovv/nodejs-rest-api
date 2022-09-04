const { Schema, model } = require('mongoose');
const Joi = require("joi");

const { handleSchemaValidationErrors } = require('../helpers');
const { string } = require('joi');

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    avatarURL: {
        type: String,
        required:true,
    },
    token: {
        type: String,
        default: null,
    },
}, { versionKey: false });

userSchema.post('save', handleSchemaValidationErrors);;

const registerSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
})

const schemas = {
    registerSchema,
    loginSchema,
}

const User = model('user', userSchema);

module.exports = {
    User,
    schemas,
}