const { Contact } = require('../../models/contact');
const { RequestError } = require("../../helpers/index");
const schemas = require("../../models/contact");

const changeById = async (req, res) => {
  const { error } = schemas.add.validate(req.body)
  if(error) {
    throw RequestError(400, error.message)
  }
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
  if(!result) {
    throw RequestError(404, "Not found")
  }
  res.json(result)
}

module.exports = changeById;