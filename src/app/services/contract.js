const ContractRepository = require("../repositories/contract.js");
const ApiError = require("../../utils/apiError.js");
const { executeTransaction } = require("../../utils/db");

const ContractService = {};

ContractService.findById = async (profileId, id) => {
  if (!profileId) {
    throw ApiError.badRequest("Missing profile id");
  }
  if (!id) {
    throw ApiError.badRequest("Missing contract id");
  }
  return await executeTransaction(async (t) => {
    return ContractRepository.find(profileId, id, t);
  }, "Unable to find contract by id");
};

ContractService.findAllActive = async (profileId, pagination) => {
  if (!profileId) {
    throw ApiError.badRequest("Missing profile id");
  }
  if (!pagination) {
    pagination = {};
  }
  pagination = {
    limit: pagination.limit || 10,
    offset: pagination.offset || 0,
  };
  return await executeTransaction(async (t) => {
    return ContractRepository.findAllActive(profileId, pagination, t);
  }, "Unable to find active contracts");
};

module.exports = ContractService;
