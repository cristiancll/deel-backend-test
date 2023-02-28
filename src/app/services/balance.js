const ApiError = require("../../utils/apiError.js");
const ProfileRepository = require("../repositories/profile");
const JobRepository = require("../repositories/job");
const { executeTransaction } = require("../../utils/db");

const BalanceService = {};

BalanceService.depositToUserId = async (profileId, userId, amount) => {
  if (!profileId) {
    throw ApiError.badRequest("Missing profile id");
  }
  if (!userId) {
    throw ApiError.badRequest("Missing user id");
  }
  if (!amount || amount <= 0) {
    throw ApiError.badRequest("Invalid amount to deposit");
  }
  if (profileId !== userId) {
    throw ApiError.unauthorized(
      "You are not authorized to deposit to this user"
    );
  }
  return await executeTransaction(async (t) => {
    const client = await ProfileRepository.find(userId, t);
    if (!client) {
      throw ApiError.notFound("User not found");
    }
    const maximumDeposit = await JobRepository.totalUnpaidSum(userId, t);
    if (!maximumDeposit) {
      throw ApiError.notFound("Client has no unpaid jobs");
    }
    if (amount > maximumDeposit.total * 0.25) {
      throw ApiError.unprocessableEntity(
        "Maximum deposit is 25% of total unpaid"
      );
    }

    client.balance += amount;
    await client.save({ transaction: t });
    return client;
  }, "Unable to deposit to user");
};

module.exports = BalanceService;
