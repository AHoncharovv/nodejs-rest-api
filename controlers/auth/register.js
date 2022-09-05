const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

const { User } = require('../../models/user');

const { RequestError } = require('../../helpers');

const register = async (req, res) => {
    const { password, email } = req.body;
    const verificationToken = uuidv4();
    const msg = {
        to: email,
        from: process.env.SENDER_EMAIL,
        subject: 'Confirming your email',
        text: `please follow the link http://localhost:3000/api/auth/users/verify/${verificationToken}`,
        html: `<p>please follow the link http://localhost:3000/api/auth/users/verify/${verificationToken}</p>`,
    }
    const user = await User.findOne({ email });
    if (user) {
        throw RequestError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const result = await User.create({ password: hashPassword, email, avatarURL, verificationToken });
    await sgMail.send(msg)
    res.status(201).json({
        email: result.email,
        subscription: result.subscription,
    })
}

module.exports = register;