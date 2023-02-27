const {sequelize} = require("../../config/db");
const Sequelize  = require("sequelize");

// 'Job'
const JobModel = 'Job';
class Job extends Sequelize.Model {}
Job.init(
    {
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        price:{
            type: Sequelize.DECIMAL(12,2),
            allowNull: false
        },
        paid: {
            type: Sequelize.BOOLEAN,
            default:false
        },
        paymentDate:{
            type: Sequelize.DATE
        }
    },
    {
        sequelize,
        modelName: JobModel
    }
);

module.exports = {Job, JobModel};