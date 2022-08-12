const express = require('express');
const { listContacts, getContactById, removeContact } = require("../../models/contacts");

const router = express.Router()

router.get('/', async (req, res, next) => {
  const result = await listContacts();
  res.json({
      status: "success",
      code: 200,
      data: result,
    });
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (result) {
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  }
  res.json({
    code: 404,
    message: 'Not found', 
    });
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    res.json({
      code: 404,
      message: "Not found"
    });
  }
  res.json({
      code: 200,
      message: "contact deleted"
    });
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})



router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
