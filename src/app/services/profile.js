const ProfileRepository = require("../repositories/profile.js");
const ApiError = require("../../utils/apiError.js");
const { executeTransaction } = require("../../utils/db");

const ProfileService = {};

ProfileService.findById = async (id) => {
  if (!id) {
    throw ApiError.badRequest("Missing profile id");
  }
  return await executeTransaction(async (t) => {
    return ProfileRepository.find(id, t);
  }, "Unable to find profile by id");
};
ProfileService.findAdminById = async (id) => {
  if (!id) {
    throw ApiError.badRequest("Missing profile id");
  }
  return await executeTransaction(async (t) => {
    return ProfileRepository.findAdmin(id, t);
  }, "Unable to find admin profile by id");
};

module.exports = ProfileService;
