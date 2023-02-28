const ApiError = require("./apiError.js");
const { sequelize } = require("../config/db.js");

async function executeTransaction(
  transactionExecutions,
  errorMessage = "Unable to execute transaction"
) {
  if (!transactionExecutions) {
    console.error("Missing transaction execution function");
    throw ApiError.internal(errorMessage);
  }
  const t = await sequelize.transaction();
  try {
    const executionsResult = await transactionExecutions(t);
    await t.commit();
    return executionsResult;
  } catch (error) {
    await t.rollback();
    console.error(error);
    throw error;
  }
}

module.exports = { executeTransaction };
