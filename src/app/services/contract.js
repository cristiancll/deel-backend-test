const ContractRepository = require("../repositories/contract.js");
const ApiError = require("../../utils/apiError.js");

const ContractService = {}

ContractService.findById = async (id) => {
    if (!id) {
        throw ApiError.badRequest("Missing contract id")
    }
    return ContractRepository.find(id)
}

module.exports = ContractService