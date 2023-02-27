const express = require('express');
const {Middlewares} = require("../middleware/middlewares.js");
const router = express.Router();
const controller = require('../app/controllers/admin')
const {header, query} = require("express-validator");

router.get(
    '/best-clients',
    header("profile_id").notEmpty(),
    query("start").optional().isISO8601().toDate(),
    query("end").optional().isISO8601().toDate(),
    query("limit").optional().isInt({gt: 0}),
    query("offset").optional().isInt({min: 0}),
    Middlewares.handleParamValidation,
    Middlewares.getAdminProfile,
    controller.getBestClients
)
router.get(
    '/best-profession',
    header("profile_id").notEmpty(),
    query("start").optional().isISO8601().toDate(),
    query("end").optional().isISO8601().toDate(),
    Middlewares.handleParamValidation,
    Middlewares.getAdminProfile,
    controller.getBestProfession
)

module.exports = router
