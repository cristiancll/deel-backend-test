const controller = require('../app/controllers/contract')
const {Middlewares} = require("../middleware/middlewares.js");
const {param} = require('express-validator');

const express = require('express');
const router = express.Router();

router.get(
    '/:id',
    param("id").notEmpty(),
    Middlewares.handleParamValidation,
    Middlewares.getProfile, 
    controller.getContractById
)

module.exports = router
