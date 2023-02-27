const ProfileService = require("../app/services/profile.js");
const ApiError = require("../utils/apiError.js");

const { validationResult } = require('express-validator');


const Middlewares = {}

Middlewares.handleParamValidation = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
}

Middlewares.getUserProfile = async (req, res, next) => {
    const id = req.get('profile_id') || 0
    if (!id || id === 0) {
        return next(ApiError.badRequest("Missing required arguments"))
    }
    try {
        const profile = await ProfileService.findById(id)
        if (!profile) {
            return next(ApiError.notFound("Profile not found"))
        }
        req.profile = profile
        return next()
    } catch (error) {
        return next(error)
    }
}

Middlewares.getAdminProfile = async (req, res, next) => {
    const id = req.get('profile_id') || 0
    if (!id || id === 0) {
        return next(ApiError.badRequest("Missing required arguments"))
    }
    try {
        const profile = await ProfileService.findAdminById(id)
        if(!profile) {
            return next(ApiError.unauthorized("User is not an admin"))
        }
        req.profile = profile
        return next()
    } catch (err) {
        return next(err)
    }
}

Middlewares.notFoundRoute = async (req, res, next) => {
    return next(ApiError.badRequest("Route not found"))
}

Middlewares.errorHandler = async (err, req, res) => {
    console.error(err.stack)
    if (!err.statusCode) {
        err.statusCode = 500
    }
    res.status(err.statusCode).json({
        error: {
            name: err.name,
            statusCode: err.statusCode,
            message: err.message,
        },
    })
}

module.exports = {Middlewares}
