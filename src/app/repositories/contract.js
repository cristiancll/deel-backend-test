const {Contract} = require("../models/contract.js");

const ContractRepository = {}

ContractRepository.find = async (id) => {
    return Contract.findOne({
        where: {
            id,
        }
    })
}

module.exports = ContractRepository