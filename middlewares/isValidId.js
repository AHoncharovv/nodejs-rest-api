const {isValidObjectId} = require('mongoose');
const { RequestError } = require("../helpers");

const isValidId = async (req, res, next) => {
    const { contactId } = req.params
    const isCorrectId = await isValidObjectId(contactId)
    if (!isCorrectId) {
        const error = RequestError(400, `${contactId} is not valid Id`)
        next(error)
    }
    next()
};

module.exports = isValidId;