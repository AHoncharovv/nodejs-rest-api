const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');
const {reverification} = require("../../schemas");

const verification = async (req, res) => {
    const { error } = reverification.validate(req.body);
    if(error) {
        throw RequestError(400, "Missing required field email");
    }
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw RequestError(401, "Email is wrong")
    }
    if (user.verify) {
        res.status(400).json({ message:"Verification has already been passed"})
    }
    const msg = {
        to: email,
        from: process.env.SENDER_EMAIL,
        subject: 'Confirming your email',
        text: `please follow the link http://localhost:3000/api/auth/users/verify/${user.verificationToken}`,
        html: `<p>please follow the link http://localhost:3000/api/auth/users/verify/${user.verificationToken}</p>`,
    }
    await sgMail.send(msg)
    res.json({message: "Verification email sent"})
}

module.exports = verification;