const { addContact } = require("../../models/contacts");
const { RequestError } = require("../../helpers/index");
const schemas = require("../../schemas/contacts");

const add = async (req, res, next) => {
  const {error} = schemas.add.validate(req.body);
  if(error) {
    throw RequestError(400, error.message);
  };
  const result = await addContact(req.body)
  res.status(201).json(result);
}

module.exports = add;