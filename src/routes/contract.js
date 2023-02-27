const {Middlewares} = require("../middleware/middlewares.js");
const controller = require('../app/controllers/contract')

const express = require('express');
const router = express.Router();

router.get(
    '/:id', 
    Middlewares.getProfile, 
    controller.getContractById
)

module.exports = router
