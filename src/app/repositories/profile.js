const {Profile} = require("../models/profile.js");

const ProfileRepository = {}

ProfileRepository.find = async (id) => {
    return Profile.findOne({
        where: id
    })
}

module.exports = ProfileRepository