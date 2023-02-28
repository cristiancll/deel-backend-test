const { Contract, ContractStatus } = require("../models/contract");
const { Op } = require("sequelize");

const ContractRepository = {};

ContractRepository.find = async (profileId, id, t) => {
  return Contract.findOne({
    where: {
      id,
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    },
    ...(t && { transaction: t }),
  });
};

ContractRepository.findAllActive = async (profileId, pagination, t) => {
  return Contract.findAll({
    where: {
      status: ContractStatus.IN_PROGRESS,
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    },
    limit: pagination.limit,
    offset: pagination.offset,
    ...(t && { transaction: t }),
  });
};

module.exports = ContractRepository;
