const express = require('express');


const ctrl = require('../../controlers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { isValidId } = require('../../middlewares');

const router = express.Router();
router.get('/', ctrlWrapper(ctrl.getAll))
router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById))
router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.deleteById))
router.post('/', ctrlWrapper(ctrl.add))
router.put('/:contactId', isValidId, ctrlWrapper(ctrl.changeById))
router.patch('/:contactId/favorite', isValidId, ctrlWrapper( ctrl.updateStatusContact))

module.exports = router
