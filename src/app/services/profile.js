const ProfileRepository = require("../repositories/profile.js");
const ApiError = require("../../utils/apiError.js");

const ProfileService = {}

ProfileService.findById = async (id) => {
    if (!id) {
        throw ApiError.badRequest("Missing profile id")
    }
    return ProfileRepository.find(id)
}

module.exports = ProfileService