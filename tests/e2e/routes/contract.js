const request = require("supertest")("http://localhost:3001");
const Generic = require("../generic.js");

const Endpoint = {};
Endpoint.GET_CONTRACTS = "/contracts";
Endpoint.GET_CONTRACT_BY_ID = "/contracts/:id";

const ContractTests = {
  GET: {},
};

ContractTests.GET.contracts = () => {
  describe(`GET ${Endpoint.GET_CONTRACTS}`, () => {
    const endpoint = Endpoint.GET_CONTRACTS;
    describe("AUTHORIZATION", () => {
      Generic.GET.userAccessTests(request, endpoint);
    });
    describe("PAGINATION", () => {
      Generic.GET.paginationTests(request, endpoint);
    });
    describe("VALIDATION", () => {
      it("should return not found response if client doesnt exist", async () => {
        await request.get(endpoint).set("profile_id", 100).expect(404);
      });
    });
    describe("RESPONSE", () => {
      it("should return a list of contracts without parameters", async () => {
        const expectedResponse = [
          {
            id: 7,
            terms: "bla bla bla",
            status: "in_progress",
            ContractorId: 7,
            ClientId: 4,
          },
          {
            id: 8,
            terms: "bla bla bla",
            status: "in_progress",
            ContractorId: 6,
            ClientId: 4,
          },
          {
            id: 9,
            terms: "bla bla bla",
            status: "in_progress",
            ContractorId: 8,
            ClientId: 4,
          },
        ];
        const response = await request
          .get(endpoint)
          .set("profile_id", 4)
          .expect(200);
        const contracts = response.body;
        contracts.forEach((contract) => {
          delete contract.createdAt;
          delete contract.updatedAt;
        });
        expect(response.body).toEqual(expectedResponse);
      });
    });
    it("should return a list of contracts with 1 as limit", async () => {
      const expectedResponse = [
        {
          id: 7,
          terms: "bla bla bla",
          status: "in_progress",
          ContractorId: 7,
          ClientId: 4,
        },
      ];
      const response = await request
        .get(endpoint)
        .query({ limit: 1 })
        .set("profile_id", 4)
        .expect(200);
      const contracts = response.body;
      contracts.forEach((contract) => {
        delete contract.createdAt;
        delete contract.updatedAt;
      });
      expect(response.body).toEqual(expectedResponse);
    });
    it("should return a list of contracts with 1 as limit and 1 as offset", async () => {
      const expectedResponse = [
        {
          id: 8,
          terms: "bla bla bla",
          status: "in_progress",
          ContractorId: 6,
          ClientId: 4,
        },
      ];
      const response = await request
        .get(endpoint)
        .query({ limit: 1, offset: 1 })
        .set("profile_id", 4)
        .expect(200);
      const contracts = response.body;
      contracts.forEach((contract) => {
        delete contract.createdAt;
        delete contract.updatedAt;
      });
      expect(response.body).toEqual(expectedResponse);
    });
    it("should return an empty list if client doesnt have contracts", async () => {
      const response = await request
        .get(endpoint)
        .set("profile_id", 5)
        .expect(200);
      expect(response.body).toEqual([]);
    });
  });
};

ContractTests.GET.contractById = () => {
  describe(`GET ${Endpoint.GET_CONTRACT_BY_ID}`, () => {
    const endpoint = Endpoint.GET_CONTRACT_BY_ID;
    describe("AUTHORIZATION", () => {
      Generic.GET.userAccessTestsWithPathParam(request, endpoint, 1, "id", 1);
    });
    describe("VALIDATION", () => {
      it("should return not found response if contract doesnt exist or is from other user", async () => {
        await request
          .get(endpoint.replace(":id", 100))
          .set("profile_id", 4)
          .expect(404);
      });
    });
    describe("RESPONSE", () => {
      it("should return a contract", async () => {
        const expectedResponse = {
          id: 1,
          terms: "bla bla bla",
          status: "terminated",
          ContractorId: 5,
          ClientId: 1,
        };
        const response = await request
          .get(endpoint.replace(":id", 1))
          .set("profile_id", 1)
          .expect(200);
        const contract = response.body;
        delete contract.createdAt;
        delete contract.updatedAt;
        expect(contract).toEqual(expectedResponse);
      });
    });
  });
};

module.exports = ContractTests;
