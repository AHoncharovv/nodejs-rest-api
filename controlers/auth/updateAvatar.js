const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');
const { User } = require('../../models/user');

const updateAvatar = async (req, res) => {
    try {
        const { path: tempUpload, filename } = req.file
        const { _id } = req.user
        const [extention] = filename.split('.').reverse()
        const avatarName = `${_id}.${extention}`
        const resultUpload = path.join(avatarDir, avatarName)
        await fs.rename(tempUpload, resultUpload)
        const avatarURL = path.join(resultUpload)
        await User.findByIdAndUpdate(_id, { avatarURL })
        const avatar = await Jimp.read(avatarURL);
        await avatar.resize(250, Jimp.AUTO).writeAsync(avatarURL);
        res.json({
            avatarURL
        })

    } catch (error) {
        await fs.unlink(req.file.path)
        throw error
    }
}

module.exports = updateAvatar;