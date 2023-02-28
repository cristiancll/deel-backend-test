const request = require("supertest")("http://localhost:3001");
const Generic = require("../generic.js");

const HTTP = require("http-status-codes");

const Endpoint = {};
Endpoint.DEPOSIT = "/balances/deposit";

const BalanceTests = {
  POST: {},
};

BalanceTests.POST.deposit = () => {
  describe(`POST ${Endpoint.DEPOSIT}`, () => {
    const endpoint = Endpoint.DEPOSIT;
    describe("AUTHORIZATION", () => {
      const userId = 2;
      Generic.POST.userAccessTests(request, `${endpoint}/${userId}`, userId, {
        amount: 1,
      });
    });
    describe("VALIDATION", () => {
      it("should return a bad request response when user is not provided", async () => {
        await request
          .post(endpoint)
          .set("profile_id", 1)
          .expect(HTTP.BAD_REQUEST);
      });
      it("should return a bad request response when amount is not provided", async () => {
        const userId = 2;
        await request
          .post(`${endpoint}/${userId}`)
          .set("profile_id", userId)
          .expect(HTTP.BAD_REQUEST);
      });
      it("should return a not authorized response when user is not the same as the profile", async () => {
        const userId = 2;
        const amount = 1;
        const profileId = 1;
        await request
          .post(`${endpoint}/${userId}`)
          .set("profile_id", profileId)
          .send({ amount })
          .expect(HTTP.UNAUTHORIZED);
      });
      it(`should return a not found response when user does not exist`, async () => {
        const userId = 9999;
        const amount = 1;
        await request
          .post(`${endpoint}/${userId}`)
          .set("profile_id", userId)
          .send({ amount })
          .expect(HTTP.NOT_FOUND);
      });
      it("should return a not found response when client does not have unpaid jobs", async () => {
        const userId = 3;
        const amount = 1;
        await request
          .post(`${endpoint}/${userId}`)
          .set("profile_id", userId)
          .send({ amount })
          .expect(HTTP.NOT_FOUND);
      });
      it("should return a unprocessable entity response when amount is above 25% of total unpaid", async () => {
        const userId = 2;
        const amount = 1000;
        await request
          .post(`${endpoint}/${userId}`)
          .set("profile_id", userId)
          .send({ amount })
          .expect(HTTP.UNPROCESSABLE_ENTITY);
      });
      it("should return a bad request response when amount is not a number", async () => {
        const userId = 2;
        const amount = false;
        await request
          .post(`${endpoint}/${userId}`)
          .set("profile_id", userId)
          .send({ amount })
          .expect(HTTP.BAD_REQUEST);
      });
    });
    it("should return a bad request response when amount is below minimum", async () => {
      const userId = 2;
      const amount = 0;
      await request
        .post(`${endpoint}/${userId}`)
        .set("profile_id", userId)
        .send({ amount })
        .expect(HTTP.BAD_REQUEST);
    });
    describe("RESPONSE", () => {
      it("should return a successful response when deposit is successful", async () => {
        const expectedResponse = {
          id: 4,
          firstName: "Ash",
          lastName: "Kethcum",
          profession: "Pokemon master",
          balance: 11.3,
          type: "client",
          role: "user",
        };
        const userId = 4;
        const amount = 10;
        const response = await request
          .post(`${endpoint}/${userId}`)
          .set("profile_id", userId)
          .send({ amount })
          .expect(HTTP.OK);
        const body = response.body;
        delete body.createdAt;
        delete body.updatedAt;
        expect(body).toEqual(expectedResponse);
      });
    });
  });
};

module.exports = BalanceTests;
