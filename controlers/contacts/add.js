const { Contact } = require('../../models/contact');
const { RequestError } = require("../../helpers/index");
const schemas = require("../../models/contact");

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const {error} = schemas.add.validate(req.body);
  if(error) {
    throw RequestError(400, error.message);
  };
  const result = await Contact.create({...req.body, owner})
  res.status(201).json(result);
}

module.exports = add;