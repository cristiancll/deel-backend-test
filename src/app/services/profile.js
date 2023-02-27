const ProfileRepository = require("../repositories/profile.js");
const ProfileService = {}

ProfileService.findById = async (id) => {
    if (!id) {
        throw new Error("Missing profile id")
    }
    return ProfileRepository.find(id)
}

module.exports = ProfileService