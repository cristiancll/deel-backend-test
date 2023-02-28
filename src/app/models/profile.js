const { sequelize } = require("../../config/db");
const Sequelize = require("sequelize");

// 'Profile'
const ProfileModel = "Profile";

const ProfileType = {
  // 'client'
  CLIENT: "client",
  // 'contractor'
  CONTRACTOR: "contractor",
};

const ProfileRole = {
  // 'admin'
  ADMIN: "admin",
  // 'user'
  USER: "user",
};

const ProfileFK = {
  // 'ClientId'
  CLIENT: "ClientId",
  // 'ContractorId'
  CONTRACTOR: "ContractorId",
};

const ProfileReference = {
  // 'Client'
  CLIENT: "Client",
  // 'Contractor'
  CONTRACTOR: "Contractor",
};

class Profile extends Sequelize.Model {}

Profile.init(
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    balance: {
      type: Sequelize.DECIMAL(12, 2),
    },
    type: {
      type: Sequelize.ENUM(ProfileType.CLIENT, ProfileType.CONTRACTOR),
    },
    role: {
      type: Sequelize.ENUM(ProfileRole.ADMIN, ProfileRole.USER),
      defaultValue: ProfileRole.USER,
    },
  },
  {
    sequelize,
    modelName: ProfileModel,
  }
);
module.exports = {
  Profile,
  ProfileType,
  ProfileFK,
  ProfileReference,
  ProfileRole,
};
