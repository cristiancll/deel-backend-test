const BalanceService = require("../services/balance");
const ApiError = require("../../utils/apiError.js");

exports.depositToUserId = async (req, res, next) => {
  const profileId = req.profile.id;
  const { userId } = req.params;
  const { amount } = req.body;
  try {
    const client = await BalanceService.depositToUserId(
      profileId,
      userId,
      amount
    );
    if (!client) {
      return next(ApiError.notFound("Client not found"));
    }
    res.json(client);
  } catch (error) {
    return next(error);
  }
};
