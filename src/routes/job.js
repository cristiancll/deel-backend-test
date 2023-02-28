const express = require("express");
const { Middlewares } = require("../middleware/middlewares.js");
const router = express.Router();
const controller = require("../app/controllers/job");
const { header, param, query } = require("express-validator");

router.get(
  "/unpaid",
  header("profile_id").exists().isString().isLength({ min: 1 }),
  query("limit").optional().isInt({ gt: 0 }),
  query("offset").optional().isInt({ min: 0 }),
  Middlewares.handleParamValidation,
  Middlewares.getUserProfile,
  controller.getUnpaidJobs
);
router.post(
  "/:job_id/pay",
  header("profile_id").exists().isString().isLength({ min: 1 }),
  param("job_id").exists().isString().isLength({ min: 1 }),
  Middlewares.handleParamValidation,
  Middlewares.getUserProfile,
  controller.payJobById
);

module.exports = router;
