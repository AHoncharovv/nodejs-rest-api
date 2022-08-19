const { getContactById } = require("../../models/contacts");
const { RequestError } = require("../../helpers/index");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    throw RequestError(404, "Not found")
  }
  res.json(result)
}

module.exports = getById;