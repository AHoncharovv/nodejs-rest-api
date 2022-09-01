const express = require('express');

const ctrl = require('../../controlers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { isValidId, authenticate } = require('../../middlewares');

const router = express.Router();
router.get('/', authenticate, ctrlWrapper(ctrl.getAll))
router.get('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.getById))
router.delete('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.deleteById))
router.post('/', authenticate, ctrlWrapper(ctrl.add))
router.put('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.changeById))
router.patch('/:contactId/favorite', authenticate, isValidId, ctrlWrapper( ctrl.updateStatusContact))

module.exports = router
