const express = require('express');


const ctrl = require('../../controlers/contacts');
const {ctrlWrapper} = require('../../helpers');

const router = express.Router();
router.get('/', ctrlWrapper(ctrl.getAll))
router.get('/:contactId', ctrlWrapper(ctrl.getById))
router.delete('/:contactId', ctrlWrapper(ctrl.deleteById))
router.post('/', ctrlWrapper(ctrl.add))
router.put('/:contactId', ctrlWrapper(ctrl.changeById))

module.exports = router
