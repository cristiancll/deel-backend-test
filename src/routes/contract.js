const express = require("express");
const { Middlewares } = require("../middleware/middlewares.js");
const router = express.Router();
const controller = require("../app/controllers/contract");
const { header, param, query } = require("express-validator");

router.get(
  "/",
  header("profile_id").notEmpty(),
  query("limit").optional().isInt({ gt: 0 }),
  query("offset").optional().isInt({ min: 0 }),
  Middlewares.handleParamValidation,
  Middlewares.getUserProfile,
  controller.getContracts
);
router.get(
  "/:id",
  header("profile_id").notEmpty(),
  param("id").notEmpty(),
  Middlewares.handleParamValidation,
  Middlewares.getUserProfile,
  controller.getContractById
);

module.exports = router
