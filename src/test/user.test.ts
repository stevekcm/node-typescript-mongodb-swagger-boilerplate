import chai from "chai";
import request from "supertest";
import testData from "./testData";
import app from "../app.js";

chai.should();

describe("Register test", () => {
  it("Register Failed - not email", async () => {
    const res = await request(app)
      .post(`/api/${process.env.API_VER}/user/register`)
      .send({
        email: "notEmail",
        password: testData.userA.password,
      })
      .expect(400);

    res.body.errors[0].msg.should.equal("Invalid Email");
  });

  it("Register Failed - low security password", async () => {
    const res = await request(app)
      .post(`/api/${process.env.API_VER}/user/register`)
      .send({
        email: testData.userA.email,
        password: "123456",
      })
      .expect(400);

    res.body.errors[0].msg.should.equal(
      "Password must contains upper case letter, lower case letter, number, and at least 8 characters"
    );
  });

  it("Register Successed", async () => {
    await request(app)
      .post(`/api/${process.env.API_VER}/user/register`)
      .send({
        email: testData.userA.email,
        password: testData.userA.password,
      })
      .expect(200);
  });

  it("Register Failed - Duplicated user", async () => {
    await request(app)
      .post(`/api/${process.env.API_VER}/user/register`)
      .send({
        email: testData.userA.email,
        password: testData.userA.password,
      })
      .expect(401);
  });
});

describe("Login test", () => {
  it("Login Failed - not email", async () => {
    await request(app)
      .post(`/api/${process.env.API_VER}/user/login`)
      .send({
        email: "notEmail",
        password: testData.userA.password,
      })
      .expect(400);
  });

  it("Login Failed - user not exist", async () => {
    await request(app)
      .post(`/api/${process.env.API_VER}/user/login`)
      .send({
        email: "notexist@email.com",
        password: testData.userA.password,
      })
      .expect(401);
  });

  it("Login Failed - weaked password", async () => {
    await request(app)
      .post(`/api/${process.env.API_VER}/user/login`)
      .send({
        email: testData.userA.email,
        password: "123456",
      })
      .expect(400);
  });

  it("Login Failed - wrong password", async () => {
    await request(app)
      .post(`/api/${process.env.API_VER}/user/login`)
      .send({
        email: testData.userA.email,
        password: "J86vmN6uvFm",
      })
      .expect(401);
  });

  it("Login Successed", async () => {
    const res = await request(app)
      .post(`/api/${process.env.API_VER}/user/login`)
      .send({
        email: testData.userA.email,
        password: testData.userA.password,
      })
      .expect(200);

    (res.body.token.length >= 10).should.be.true;
    testData.userA.authorization = res.body.token;
  });
});

describe("Get User info", () => {
  it("Get User Failed - missing JWT header", async () => {
    const res = await request(app).get(`/api/${process.env.API_VER}/user/get`).expect(401);
    res.body.errors[0].msg.should.equal("Missing token, failed to authenticate");
  });

  it("Get User Failed - invalid token", async () => {
    const res = await request(app)
      .get(`/api/${process.env.API_VER}/user/get`)
      .set("authorization", "invalidJWT")
      .expect(500);

    res.body.errors[0].msg.should.equal("jwt malformed");
  });

  it("Get User Successed", async () => {
    const res = await request(app)
      .get(`/api/${process.env.API_VER}/user/get`)
      .set("authorization", testData.userA.authorization)
      .expect(200);

    res.body.email.should.equal(testData.userA.email);
  });
});
