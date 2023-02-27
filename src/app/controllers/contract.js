const ContractService = require('../services/contract')
const ApiError = require("../../utils/apiError.js");

/**
 * FIX ME!
 * @returns contract by id
 */
exports.getContractById = async (req, res, next) => {
    const {id} = req.params
    try {
        const contract = await ContractService.findById(id)
        if (!contract) {
            return next(ApiError.notFound("Contract not found"))
        }
        res.json(contract)
    } catch (error) {
        return next(error)
    }
}