const ContractService = require('../services/contract')

/**
 * FIX ME!
 * @returns contract by id
 */
exports.getContractById = async (req, res, next) => {
    const {id} = req.params
    try {
        const contract = await ContractService.findById(id)
        if (!contract) {
            return next(new Error("Contract not found"))
        }
        res.json(contract)
    } catch (error) {
        return next(error)
    }
}