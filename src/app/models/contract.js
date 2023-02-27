const {sequelize} = require("../../config/db");
const Sequelize  = require("sequelize");

// 'Contract'
const ContractModel = 'Contract'

const ContractStatus = {
    // 'new'
    NEW: 'new',
    // 'in_progress'
    IN_PROGRESS: 'in_progress',
    // 'terminated'
    TERMINATED: 'terminated'
}

class Contract extends Sequelize.Model {}
Contract.init(
    {
        terms: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        status:{
            type: Sequelize.ENUM(ContractStatus.NEW, ContractStatus.IN_PROGRESS, ContractStatus.TERMINATED)
        }
    },
    {
        sequelize,
        modelName: ContractModel
    }
);

module.exports = {Contract, ContractStatus, ContractModel};