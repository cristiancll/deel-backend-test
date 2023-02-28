const {
  Profile,
  ProfileFK,
  ProfileReference,
} = require("../app/models/profile.js");
const { Contract } = require("../app/models/contract.js");
const { Job } = require("../app/models/job.js");

Profile.hasMany(Contract, {
  as: ProfileReference.CONTRACTOR,
  foreignKey: ProfileFK.CONTRACTOR,
});
Contract.belongsTo(Profile, { as: ProfileReference.CONTRACTOR });
Profile.hasMany(Contract, {
  as: ProfileReference.CLIENT,
  foreignKey: ProfileFK.CLIENT,
});
Contract.belongsTo(Profile, { as: ProfileReference.CLIENT });
Contract.hasMany(Job);
Job.belongsTo(Contract);
