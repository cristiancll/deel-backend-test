const ApiError = require("../../utils/apiError");
const { executeTransaction } = require("../../utils/db");
const JobRepository = require("../repositories/job");
const ProfileRepository = require("../repositories/profile");

const AdminService = {};

AdminService.getBestProfession = async (profileId, period) => {
  if (!profileId) {
    throw ApiError.badRequest("Missing profile id");
  }

  const now = new Date();
  const beginning = new Date(null);
  if (!period) {
    period = {};
  }
  period = {
    start: period.start || beginning,
    end: period.end || now,
  };

  return await executeTransaction(async (t) => {
    const adminProfile = await ProfileRepository.findAdmin(profileId, t);
    if (!adminProfile) {
      throw ApiError.unauthorized(
        "You are not authorized to perform this action"
      );
    }
    const bestProfession = await JobRepository.mostPaidProfession(period, t);
    if (!bestProfession) {
      throw ApiError.notFound("No profession found");
    }
    return bestProfession;
  }, "Unable to get best profession");
};

AdminService.getBestClients = async (profileId, period, pagination) => {
  if (!profileId) {
    throw ApiError.badRequest("Missing profile id");
  }

  const now = new Date();
  const beginning = new Date(null);
  if (!period) {
    period = {};
  }
  period = {
    start: period.start || beginning,
    end: period.end || now,
  };
  if (!pagination) {
    pagination = {};
  }
  pagination = {
    limit: pagination.limit || 2,
    offset: pagination.offset || 0,
  };
  return await executeTransaction(async (t) => {
    const adminProfile = await ProfileRepository.findAdmin(profileId, t);
    if (!adminProfile) {
      throw ApiError.unauthorized(
        "You are not authorized to perform this action"
      );
    }
    return await JobRepository.highestPayingClients(period, pagination, t);
  }, "Unable to get best clients");
};

module.exports = AdminService;
