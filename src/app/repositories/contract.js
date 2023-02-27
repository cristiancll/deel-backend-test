const {Contract} = require("../models/contract.js");
const {Op} = require("sequelize");

const ContractRepository = {}

ContractRepository.find = async (profileId, id, t) => {
    return Contract.findOne({
        where: {
            id,
            [Op.or]: [
                {ClientId: profileId},
                {ContractorId: profileId}
            ]
        },
        ...(t && {transaction: t})
    })
}

module.exports = ContractRepository