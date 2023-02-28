const { Op, fn, col, literal } = require("sequelize");
const {
  Contract,
  ContractModel,
  ContractStatus,
} = require("../models/contract");
const { ProfileReference, Profile } = require("../models/profile");
const { Job } = require("../models/job");

const JobRepositories = {};

JobRepositories.findAllActiveUnpaid = async (profileId, pagination, t) => {
  return Job.findAll({
    where: {
      paid: { [Op.not]: true },
    },
    include: [
      {
        model: Contract,
        as: ContractModel,
        where: {
          [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
          status: ContractStatus.IN_PROGRESS,
        },
      },
    ],
    limit: pagination.limit,
    offset: pagination.offset,
    ...(t && { transaction: t }),
  });
};
JobRepositories.findActiveUnpaid = async (profileId, id, t) => {
  return Job.findOne({
    where: {
      id,
      paid: { [Op.not]: true },
    },
    include: [
      {
        model: Contract,
        as: ContractModel,
        where: {
          ClientId: profileId,
          status: ContractStatus.IN_PROGRESS,
        },
      },
    ],
    ...(t && { transaction: t }),
  });
};
JobRepositories.totalUnpaidSum = async (profileId, t) => {
  return Job.findOne({
    attributes: [[fn("sum", col("price")), "total"]],
    where: {
      paid: { [Op.not]: true },
    },
    include: [
      {
        model: Contract,
        as: ContractModel,
        attributes: [],
        where: {
          ClientId: profileId,
          status: ContractStatus.IN_PROGRESS,
        },
      },
    ],
    raw: true,
    group: ["Contract.ClientId"],
    ...(t && { transaction: t }),
  });
};
JobRepositories.mostPaidProfession = async (period, t) => {
  return Job.findOne({
    attributes: [
      [fn("count", col("Job.id")), "totalJobs"],
      [fn("sum", col("Job.price")), "totalPaid"],
      [col("Contract.Contractor.profession"), "profession"],
    ],
    include: [
      {
        model: Contract,
        as: ContractModel,
        attributes: [],
        include: {
          model: Profile,
          as: ProfileReference.CONTRACTOR,
          attributes: [],
        },
      },
    ],
    where: {
      paid: true,
      paymentDate: {
        [Op.between]: [period.start, period.end],
      },
    },
    raw: true,
    group: ["Contract.Contractor.profession"],
    order: [["totalPaid", "DESC"]],
    ...(t && { transaction: t }),
  });
};
JobRepositories.highestPayingClients = async (period, pagination, t) => {
  return Job.findAll({
    attributes: [
      [col("Contract.Client.id"), "id"],
      [literal("firstName || ' ' || lastName"), "fullName"],
      [fn("sum", col("Job.price")), "paid"],
    ],
    include: [
      {
        model: Contract,
        as: ContractModel,
        attributes: [],
        include: [
          {
            model: Profile,
            as: ProfileReference.CLIENT,
            attributes: [],
          },
        ],
      },
    ],
    where: {
      paid: true,
      paymentDate: {
        [Op.between]: [period.start, period.end],
      },
    },
    group: ["Contract.Client.id"],
    order: [["paid", "DESC"]],
    raw: true,
    limit: pagination.limit,
    offset: pagination.offset,
    ...(t && { transaction: t }),
  });
};

module.exports = JobRepositories;
