const request = require("supertest")("http://localhost:3001");
const Generic = require("../generic.js");

const Endpoint = {};
Endpoint.BEST_CLIENTS = "/admin/best-clients";
Endpoint.BEST_PROFESSION = "/admin/best-profession";

const AdminTests = {
  GET: {},
};

AdminTests.GET.bestClients = () => {
  describe(`GET ${Endpoint.BEST_CLIENTS}`, () => {
    const endpoint = Endpoint.BEST_CLIENTS;
    describe("AUTHORIZATION", () => {
      Generic.GET.adminAccessTests(request, endpoint);
    });
    describe("PERIOD", () => {
      Generic.GET.periodTests(request, endpoint);
    });
    describe("PAGINATION", () => {
      Generic.GET.paginationTests(request, endpoint);
    });
    describe("RESPONSE", () => {
      it("should return a list of best clients without parameters", async () => {
        const expectedResponse = [
          {
            id: 4,
            fullName: "Ash Kethcum",
            paid: 2020,
          },
          {
            id: 2,
            fullName: "Mr Robot",
            paid: 442,
          },
        ];
        const response = await request
          .get(endpoint)
          .set("profile_id", 1)
          .expect(200);
        expect(response.body).toEqual(expectedResponse);
      });
      it("should return a list of best clients with 3 as limit", async () => {
        const expectedResponse = [
          {
            id: 4,
            fullName: "Ash Kethcum",
            paid: 2020,
          },
          {
            id: 2,
            fullName: "Mr Robot",
            paid: 442,
          },
          {
            id: 1,
            fullName: "Harry Potter",
            paid: 442,
          },
        ];
        const response = await request
          .get(endpoint)
          .query({ limit: 3 })
          .set("profile_id", 1)
          .expect(200);
        expect(response.body).toEqual(expectedResponse);
      });
      it("should return a list of best clients with 3 as limit and 1 as offset", async () => {
        const expectedResponse = [
          {
            id: 2,
            fullName: "Mr Robot",
            paid: 442,
          },
          {
            id: 1,
            fullName: "Harry Potter",
            paid: 442,
          },
          {
            id: 3,
            fullName: "John Snow",
            paid: 200,
          },
        ];
        const response = await request
          .get(endpoint)
          .query({ limit: 3, offset: 1 })
          .set("profile_id", 1)
          .expect(200);
        expect(response.body).toEqual(expectedResponse);
      });
      it("should return the best client of a specific date", async () => {
        const expectedResponse = [
          {
            id: 2,
            fullName: "Mr Robot",
            paid: 200,
          },
        ];
        const response = await request
          .get(endpoint)
          .query({ start: "2020-08-16", end: "2020-08-17", limit: 1 })
          .set("profile_id", 1)
          .expect(200);
        expect(response.body).toEqual(expectedResponse);
      });
    });
  });
};
AdminTests.GET.bestProfession = () => {
  describe(`GET ${Endpoint.BEST_PROFESSION}`, () => {
    const endpoint = Endpoint.BEST_PROFESSION;
    describe("AUTHORIZATION", () => {
      Generic.GET.adminAccessTests(request, endpoint);
    });
    describe("PERIOD", () => {
      Generic.GET.periodTests(request, endpoint);
    });
    describe("RESPONSE", () => {
      it("should return the best profession without parameters", async () => {
        const expectedResponse = {
          totalJobs: 6,
          totalPaid: 2683,
          profession: "Programmer",
        };
        const response = await request
          .get(endpoint)
          .set("profile_id", 1)
          .expect(200);
        expect(response.body).toEqual(expectedResponse);
      });
      it("should return the best profession of a specific date", async () => {
        const expectedResponse = {
          totalJobs: 1,
          totalPaid: 200,
          profession: "Programmer",
        };
        const response = await request
          .get(endpoint)
          .query({ start: "2020-08-16", end: "2020-08-17" })
          .set("profile_id", 1)
          .expect(200);
        expect(response.body).toEqual(expectedResponse);
      });
    });
  });
};

module.exports = AdminTests;
