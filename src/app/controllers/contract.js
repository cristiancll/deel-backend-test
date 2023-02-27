const ContractService = require('../services/contract')
const ApiError = require("../../utils/apiError.js");

exports.getContractById = async (req, res, next) => {
    const profileId = req.profile.id
    const {id} = req.params
    try {
        const contract = await ContractService.findById(profileId, id)
        if (!contract) {
            return next(ApiError.notFound("Contract not found"))        
        }
        res.json(contract)
    } catch (error) {
        return next(error)
    }
    
}

exports.getContracts = async (req, res, next) => {
}