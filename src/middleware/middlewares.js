const ProfileService = require("../app/services/profile.js");

const Middlewares = {}

Middlewares.getProfile = async (req, res, next) => {
    const id = req.get('profile_id') || 0
    if (!id || id === 0) {
        return next(new Error("Missing required arguments"))
    }
    try {
        const profile = await ProfileService.findById(id)
        if (!profile) {
            return next(new Error("Profile not found"))
        }
        req.profile = profile
        return next()
    } catch (error) {
        return next(error)
    }
}

module.exports = {Middlewares}
