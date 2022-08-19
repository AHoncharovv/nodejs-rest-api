const { updateContact } = require("../../models/contacts");
const { RequestError } = require("../../helpers/index");
const schemas = require("../../schemas/contacts");

const changeById = async (req, res, next) => {
  const { error } = schemas.add.validate(req.body);
  if(error) {
    throw RequestError(400, error.message);
  };
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if(!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
}

module.exports = changeById;