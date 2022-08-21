const { Contact } = require('../../models/contact');
const { RequestError } = require("../../helpers/index");
const {updateFavoriteFieldSchema} = require("../../schemas");


const updateStatusContact = async (req, res, next) => {
    const { error } = updateFavoriteFieldSchema.validate(req.body);
  if(error) {
    throw RequestError(400, "missing field favorite");
  };
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if(!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
}

module.exports = updateStatusContact;