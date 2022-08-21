const { Contact } = require('../../models/contact');
const { RequestError } = require("../../helpers/index");

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError(404, "Not found")
  }
  res.json({message: "contact deleted"})
}

module.exports = deleteById;