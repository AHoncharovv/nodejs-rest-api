const express = require('express');

const { ctrlWrapper } = require('../../helpers');
const ctrl = require('../../controlers/auth');
const { validationBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/users/signup', validationBody(schemas.registerSchema), ctrlWrapper(ctrl.register));
router.post('/users/login', validationBody(schemas.loginSchema), ctrlWrapper(ctrl.login));
router.get('/users/logout', authenticate, ctrlWrapper(ctrl.logout));
router.get('/users/current', authenticate, ctrlWrapper(ctrl.current));


module.exports = router;