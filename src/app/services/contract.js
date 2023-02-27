const ContractRepository = require("../repositories/contract.js");

const ContractService = {}

ContractService.findById = async (id) => {
    if (!id) {
        throw new Error("Missing contract id")
    }
    return ContractRepository.find(id)
}

module.exports = ContractService