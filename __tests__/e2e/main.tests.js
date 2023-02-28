const AdminTests = require(`../../tests/e2e/routes/admin`);
const ContractTests = require("../../tests/e2e/routes/contract");
const BalanceTests = require("../../tests/e2e/routes/balance");
const JobTests = require("../../tests/e2e/routes/job");

describe(`E2E Tests`, () => {
  AdminTests.GET.bestClients();
  AdminTests.GET.bestProfession();

  ContractTests.GET.contracts();
  ContractTests.GET.contractById();

  JobTests.GET.unpaidJobs();
  JobTests.POST.payJobById();

  BalanceTests.POST.deposit();
});
