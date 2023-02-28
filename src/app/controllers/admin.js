const ApiError = require("../../utils/apiError");
const AdminService = require("../services/admin");

exports.getBestProfession = async (req, res, next) => {
  const { start, end } = req.query;
  const period = { start, end };
  const profileId = req.profile.id;
  try {
    const profession = await AdminService.getBestProfession(profileId, period);
    if (!profession) {
      return next(ApiError.notFound("No profession found"));
    }
    res.json(profession);
  } catch (error) {
    return next(error);
  }
};

exports.getBestClients = async (req, res, next) => {
  const { start, end, limit, offset } = req.query;
  const pagination = { limit, offset };
  const period = { start, end };
  const profileId = req.profile.id;
  try {
    const clients = await AdminService.getBestClients(
      profileId,
      period,
      pagination
    );
    if (!clients) {
      return next(ApiError.notFound("No clients found"));
    }
    res.json(clients);
  } catch (error) {
    return next(error);
  }
};
