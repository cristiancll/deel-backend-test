const HTTP = require("http-status-codes");

const Generic = {
  GET: {},
  POST: {},
};

Generic.GET.paginationTests = (request, url) => {
  it("should return a successful response with minimum limit param", async () => {
    const limit = 1;
    await request
      .get(url)
      .query({ limit })
      .set("profile_id", 1)
      .expect(HTTP.OK);
  });

  it("should return a bad request error when limit is below minimum", async () => {
    const limit = 0;
    await request
      .get(url)
      .query({ limit })
      .set("profile_id", 1)
      .expect(HTTP.BAD_REQUEST);
  });

  it("should return a bad request error when limit is NaN", async () => {
    const limit = false;
    await request
      .get(url)
      .query({ limit })
      .set("profile_id", 1)
      .expect(HTTP.BAD_REQUEST);
  });

  it("should return a successful response with minimum offset param", async () => {
    const offset = 0;
    await request
      .get(url)
      .query({ offset })
      .set("profile_id", 1)
      .expect(HTTP.OK);
  });

  it("should return a bad request error when offset is below minimum", async () => {
    const offset = -1;
    await request
      .get(url)
      .query({ offset })
      .set("profile_id", 1)
      .expect(HTTP.BAD_REQUEST);
  });

  it("should return a bad request error when offset is NaN", async () => {
    const offset = false;
    await request
      .get(url)
      .query({ offset })
      .set("profile_id", 1)
      .expect(HTTP.BAD_REQUEST);
  });
};
Generic.GET.periodTests = (request, url) => {
  it("should return a successful response when start is valid", async () => {
    const date = "1970-01-01";
    await request
      .get(url)
      .query({ start: date })
      .set("profile_id", 1)
      .expect(HTTP.OK);
  });
  it("should return a bad request response when start is invalid", async () => {
    const date = 123;
    await request
      .get(url)
      .query({ start: date })
      .set("profile_id", 1)
      .expect(HTTP.BAD_REQUEST);
  });
  it("should return a successful response when end is valid", async () => {
    const date = new Date().toISOString();
    await request
      .get(url)
      .query({ end: date })
      .set("profile_id", 1)
      .expect(HTTP.OK);
  });
  it("should return a bad request response when end is invalid", async () => {
    const date = 123;
    await request
      .get(url)
      .query({ end: date })
      .set("profile_id", 1)
      .expect(HTTP.BAD_REQUEST);
  });
};

Generic.GET.userAccessTestsWithPathParam = (
  request,
  url,
  profileId = 1,
  pathParam,
  pathParamValue
) => {
  it("should return a bad request error when profile_id is missing", async () => {
    await request
      .get(url.replace(`:${pathParam}`, pathParamValue))
      .expect(HTTP.BAD_REQUEST);
  });
  it("should return a successful response when profile_id is correct", async () => {
    await request
      .get(url.replace(`:${pathParam}`, pathParamValue))
      .set("profile_id", profileId)
      .expect(HTTP.OK);
  });
};
Generic.GET.userAccessTests = (request, url, profileId = 1) => {
  it("should return a bad request error when profile_id is missing", async () => {
    await request.get(url).expect(HTTP.BAD_REQUEST);
  });
  it("should return a successful response when profile_id is correct", async () => {
    await request.get(url).set("profile_id", profileId).expect(HTTP.OK);
  });
};
Generic.POST.userAccessTests = (request, url, profileId = 1, body = {}) => {
  it("should return a bad request error when profile_id is missing", async () => {
    await request.post(url).expect(HTTP.BAD_REQUEST);
  });
  it("should return a successful response when profile_id is correct", async () => {
    await request
      .post(url)
      .set("profile_id", profileId)
      .send(body)
      .expect(HTTP.OK);
  });
};
Generic.POST.userAccessTestsWithPathParam = (
  request,
  url,
  profileId = 1,
  body = {},
  pathParam,
  pathParamValue
) => {
  it("should return a bad request error when profile_id is missing", async () => {
    await request
      .post(url.replace(`:${pathParam}`, pathParamValue))
      .send(body)
      .expect(HTTP.BAD_REQUEST);
  });
  it("should return a successful response when profile_id is correct", async () => {
    await request
      .post(url.replace(`:${pathParam}`, pathParamValue))
      .set("profile_id", profileId)
      .send(body)
      .expect(HTTP.OK);
  });
};

Generic.GET.adminAccessTests = (request, url) => {
  Generic.GET.userAccessTests(request, url);
  it("should return an unauthorized error when profile_id is incorrect", async () => {
    await request.get(url).set("profile_id", 2).expect(HTTP.UNAUTHORIZED);
  });
};

module.exports = Generic;
