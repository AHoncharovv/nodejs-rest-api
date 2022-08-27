const bcrypt = require('bcryptjs');

const { User } = require('../../models/user');

const { RequestError } = require('../../helpers');

const login = async (req, res) => {
    const { password, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw RequestError(401, "Email or password is wrong")
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        throw RequestError(401, "Email or password is wrong")
    }
    const token = "1231fefefe.15141efergr.6262626efefefefe";
    
    res.json({
        token,
    })
}

module.exports = login;