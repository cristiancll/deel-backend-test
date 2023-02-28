const ApiError = require("../../utils/apiError.js");
const JobRepository = require("../repositories/job");
const { executeTransaction } = require("../../utils/db");

const JobService = {};

JobService.findAllActiveUnpaid = async (profileId, pagination) => {
  if (!profileId) {
    throw ApiError.badRequest("Missing profile id");
  }
  if (!pagination) {
    pagination = {};
  }
  if (!pagination.limit) {
    pagination.limit = 10;
  }
  if (!pagination.offset) {
    pagination.offset = 0;
  }
  return await executeTransaction(async (t) => {
    return JobRepository.findAllActiveUnpaid(profileId, pagination, t);
  }, "Unable to find unpaid jobs");
};
JobService.payJobById = async (profileId, id) => {
  if (!profileId) {
    throw ApiError.badRequest("Missing profile id");
  }
  if (!id) {
    throw ApiError.badRequest("Missing job id");
  }

  return await executeTransaction(async (t) => {
    const job = await JobRepository.findActiveUnpaid(profileId, id, t);
    if (!job) {
      throw ApiError.notFound("Job not found or already paid");
    }
    const price = job.price;
    const contract = job.Contract;
    const client = await contract.getClient();
    if (client.id !== profileId) {
      throw ApiError.unauthorized("Only the client can pay for a job");
    }
    if (client.balance < price) {
      throw ApiError.unprocessableEntity("Insufficient funds");
    }
    client.balance -= price;
    await client.save({ transaction: t });

    const contractor = await contract.getContractor();
    contractor.balance += price;
    await contractor.save({ transaction: t });

    job.paid = true;
    job.paymentDate = new Date();
    await job.save({ transaction: t });

    return job;
  }, "Unable to pay for job");
};

module.exports = JobService;
