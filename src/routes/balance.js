const express = require('express');
const {Middlewares} = require("../middleware/middlewares.js");
const router = express.Router();
const controller = require('../app/controllers/balance')
const { header, param, body } = require('express-validator');

router.post(
    '/deposit/:userId',
    header("profile_id").notEmpty(),
    param("userId").notEmpty().toInt(),
    body("amount").isInt({gt: 0}),
    Middlewares.handleParamValidation,
    Middlewares.getUserProfile,
    controller.depositToUserId
)

module.exports = router
