const JobService = require("../services/job");
const ApiError = require("../../utils/apiError.js");

exports.getUnpaidJobs = async (req, res, next) => {
  const { limit, offset } = req.query;
  const pagination = { limit, offset };
  const profileId = req.profile.id;
  try {
    const jobs = await JobService.findAllActiveUnpaid(profileId, pagination);
    if (!jobs) {
      return next(ApiError.notFound("No unpaid jobs found"));
    }
    res.json(jobs);
  } catch (error) {
    return next(error);
  }
};

exports.payJobById = async (req, res, next) => {
  const profileId = req.profile.id;
  const { job_id } = req.params;
  try {
    const job = await JobService.payJobById(profileId, job_id);
    if (!job) {
      return next(ApiError.notFound("Job not found"));
    }
    res.json(job);
  } catch (error) {
    return next(error);
  }
};
