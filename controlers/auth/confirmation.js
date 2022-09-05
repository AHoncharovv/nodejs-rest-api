const { User } = require('../../models/user');

const { RequestError } = require('../../helpers');

const confirmation = async (req, res) => {
    const { verificationToken } = req.params
    const user = await User.findOne({ verificationToken })
    if (!user) {
        throw RequestError(404, 'Not Found')
    }
    await User.findByIdAndUpdate(user._id, { verificationToken: null, verify: true })
    res.json({
        message: 'Verification successful',
    })
}

module.exports = confirmation;