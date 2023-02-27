const ContractRepository = require("../repositories/contract.js");
const ApiError = require("../../utils/apiError.js");

const ContractService = {}

ContractService.findById = async (profileId, id) => {
    if (!profileId) {
        throw ApiError.badRequest("Missing profile id");
    }
    if (!id) {
        throw ApiError.badRequest("Missing contract id");
    }
    return ContractRepository.find(profileId, id)
}

module.exports = ContractService