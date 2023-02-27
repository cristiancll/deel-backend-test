const {sequelize} = require("../../config/db");
const Sequelize  = require("sequelize");

// 'Profile'
const ProfileModel = 'Profile';

const ProfileType = {
    // 'client'
    CLIENT: "client",
    // 'contractor'
    CONTRACTOR: "contractor"
}

const ProfileFK = {
    // 'ClientId'
    CLIENT: "ClientId",
    // 'ContractorId'
    CONTRACTOR: "ContractorId"
}

const ProfileReference = {
    // 'Client'
    CLIENT: "Client",
    // 'Contractor'
    CONTRACTOR: "Contractor",
}

class Profile extends Sequelize.Model {}
Profile.Types = {}
Profile.Types.CLIENT = ProfileType.CLIENT
Profile.Types.CONTRACTOR = ProfileType.CONTRACTOR


Profile.init(
    {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        profession: {
            type: Sequelize.STRING,
            allowNull: false
        },
        balance:{
            type:Sequelize.DECIMAL(12,2)
        },
        type: {
            type: Sequelize.ENUM(ProfileType.CLIENT, ProfileType.CONTRACTOR),
        },
    },
    {
        sequelize,
        modelName: ProfileModel
    }
);
module.exports = {Profile, ProfileType, ProfileFK, ProfileReference}
