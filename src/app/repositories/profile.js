const {Profile, ProfileRole} = require("../models/profile.js");

const ProfileRepository = {}

ProfileRepository.find = async (id, t) => {
    return Profile.findOne({
        where: { 
            id: id 
        },
        ...(t && {transaction: t})
    })
}
ProfileRepository.findAdmin = async (id, t) => {
    return Profile.findOne({
        where: {
            id: id,
            role: ProfileRole.ADMIN
        },
        ...(t && {transaction: t})
    })
}

module.exports = ProfileRepository