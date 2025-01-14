const { Contact } = require('../../models/contact');

const getAll = async (req, res) => {
  const { _id: owner } = req.user
  const { page = 1, limit = 10 } = req.query
  const skip = (page - 1) * limit
  const result = await Contact.find({ owner }, '', {skip, limit: Number(limit)})
                        .populate('owner', 'email')
  console.log(req.user.email)
  console.log(req.user.subscription)
  res.json(result)
}
module.exports = getAll;