const request = require("supertest")("http://localhost:3001");
const Generic = require("../generic.js");

const HTTP = require("http-status-codes");

const Endpoint = {};
Endpoint.UNPAID_JOBS = "/jobs/unpaid";
Endpoint.PAY_JOB_BY_ID = "/jobs/:job_id/pay/";

const JobTests = {
  GET: {},
  POST: {},
};

JobTests.GET.unpaidJobs = () => {
  describe(`GET ${Endpoint.UNPAID_JOBS}`, () => {
    const endpoint = Endpoint.UNPAID_JOBS;
    describe("AUTHORIZATION", () => {
      Generic.GET.userAccessTests(request, endpoint);
    });
    describe("PAGINATION", () => {
      Generic.GET.paginationTests(request, endpoint);
    });
    describe("RESPONSE", () => {
      it("should return an empty array if there are no unpaid jobs", async () => {
        const response = await request
          .get(endpoint)
          .set("profile_id", 3)
          .expect(HTTP.OK);
        expect(response.body).toEqual([]);
      });
      it("should return an array of unpaid jobs without parameters", async () => {
        const expectedResponse = [
          {
            id: 2,
            description: "work",
            price: 201,
            paid: null,
            paymentDate: null,
            ContractId: 2,
            Contract: {
              id: 2,
              terms: "bla bla bla",
              status: "in_progress",
              ContractorId: 6,
              ClientId: 1,
            },
          },
        ];
        const response = await request
          .get(endpoint)
          .set("profile_id", 1)
          .expect(HTTP.OK);
        const unpaidJobs = response.body;
        unpaidJobs.forEach((job) => {
          delete job.createdAt;
          delete job.updatedAt;
          delete job.Contract.createdAt;
          delete job.Contract.updatedAt;
        });
        expect(unpaidJobs).toEqual(expectedResponse);
      });
      it("should return an array of one unpaid job", async () => {
        const expectedResponse = [
          {
            id: 3,
            description: "work",
            price: 202,
            paid: null,
            paymentDate: null,
            ContractId: 3,
            Contract: {
              id: 3,
              terms: "bla bla bla",
              status: "in_progress",
              ContractorId: 6,
              ClientId: 2,
            },
          },
        ];
        const response = await request
          .get(endpoint)
          .set("profile_id", 2)
          .query({ limit: 1 })
          .expect(HTTP.OK);
        const unpaidJobs = response.body;
        unpaidJobs.forEach((job) => {
          delete job.createdAt;
          delete job.updatedAt;
          delete job.Contract.createdAt;
          delete job.Contract.updatedAt;
        });
        expect(unpaidJobs).toEqual(expectedResponse);
      });
      it("should return an array of one unpaid job from offset 1", async () => {
        const expectedResponse = [
          {
            id: 4,
            description: "work",
            price: 200,
            paid: null,
            paymentDate: null,
            ContractId: 4,
            Contract: {
              id: 4,
              terms: "bla bla bla",
              status: "in_progress",
              ContractorId: 7,
              ClientId: 2,
            },
          },
        ];
        const response = await request
          .get(endpoint)
          .set("profile_id", 2)
          .query({ limit: 1, offset: 1 })
          .expect(HTTP.OK);
        const unpaidJobs = response.body;
        unpaidJobs.forEach((job) => {
          delete job.createdAt;
          delete job.updatedAt;
          delete job.Contract?.createdAt;
          delete job.Contract?.updatedAt;
        });
        expect(unpaidJobs).toEqual(expectedResponse);
      });
    });
  });
};

JobTests.POST.payJobById = () => {
  describe(`POST ${Endpoint.PAY_JOB_BY_ID}`, () => {
    const endpoint = Endpoint.PAY_JOB_BY_ID;
    describe("AUTHORIZATION", () => {
      Generic.POST.userAccessTestsWithPathParam(
        request,
        endpoint,
        2,
        {},
        "job_id",
        "4"
      );
    });
    describe("VALIDATION", () => {
      it("should return not found response if job is already paid or does not exist", async () => {
        await request
          .post(endpoint.replace(":job_id", 1))
          .set("profile_id", 1)
          .expect(HTTP.NOT_FOUND);
      });
      it("should return not found response if user is not the client", async () => {
        const jobId = 4;
        const profileId = 1;
        await request
          .post(endpoint.replace(":job_id", jobId))
          .set("profile_id", profileId)
          .expect(HTTP.NOT_FOUND);
      });
      it("should return unprocessable entity response if user does not have enough funds", async () => {
        const profileId = 4;
        await request
          .post(endpoint.replace(":job_id", "5"))
          .set("profile_id", profileId)
          .expect(HTTP.UNPROCESSABLE_ENTITY);
      });
    });
    describe("RESPONSE", () => {
      it("should return the job if it was paid successfully", async () => {
        const expectedResponse = {
          id: 2,
          description: "work",
          price: 201,
          paid: true,
          ContractId: 2,
          Contract: {
            id: 2,
            terms: "bla bla bla",
            status: "in_progress",
            ContractorId: 6,
            ClientId: 1,
          },
        };
        const profileId = 1;
        const response = await request
          .post(endpoint.replace(":job_id", "2"))
          .set("profile_id", profileId)
          .expect(HTTP.OK);
        const job = response.body;
        delete job.Contract?.createdAt;
        delete job.Contract?.updatedAt;
        delete job.createdAt;
        delete job.updatedAt;
        delete job.paymentDate;
        expect(job).toEqual(expectedResponse);
      });
    });
  });
};

module.exports = JobTests;
