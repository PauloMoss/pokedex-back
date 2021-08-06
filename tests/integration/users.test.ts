import supertest from "supertest";
import { getConnection, getRepository } from "typeorm";

import app, { init } from "../../src/app";
import User from "../../src/entities/User";
import { createUser, insertValidUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /sign-up", () => {
  it("returns status 201 for succsselfuly created user", async () => {

    const body = createUser();

    const beforeInsert = await getRepository(User).find()
    const response = await supertest(app).post("/sign-up").send(body);
    const afterInsert = await getRepository(User).find()
    
    expect(beforeInsert.length).toBe(0);
    expect(response.status).toEqual(201);
    expect(afterInsert.length).toBe(1);
  });

  it("returns status 409 for existent user", async () => {

    const body = createUser();
    const { email, password } = body
    await getRepository(User).insert({ email, password })
    
    const response = await supertest(app).post("/sign-up").send(body);
    const afterRequest = await getRepository(User).find()
    
    expect(response.status).toEqual(409);
    expect(afterRequest.length).toBe(1);
  });

  it("returns status 400 for invalid params", async () => {

    const body = createUser();
    body.email = "notEmail"
    
    const response = await supertest(app).post("/sign-up").send(body);
    const afterRequest = await getRepository(User).find()
    
    expect(response.status).toEqual(400);
    expect(afterRequest.length).toBe(0);
  });

  it("returns status 400 for empty params", async () => {

    const body = createUser();
    body.password = ""
    
    const response = await supertest(app).post("/sign-up").send(body);
    const afterRequest = await getRepository(User).find()
    
    expect(response.status).toEqual(400);
    expect(afterRequest.length).toBe(0);
  });
});

describe("POST /sign-in", () => {
  it("returns 200 for login with valid params", async () => {

    const body = {email: "email@email.com", password: "123456" }
    await insertValidUser(body.email, body.password);

    const response = await supertest(app).post("/sign-in").send(body);

    expect(response.status).toEqual(200);
  });

  it("returns an object with token for succsselfuly logged user", async () => {
    const body = {email: "email@email.com", password: "123456" }
    await insertValidUser(body.email, body.password);
    
    const response = await supertest(app).post("/sign-in").send(body);

    expect(response.body.token).not.toBe(undefined);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        userId: 1
      })
    );
  });

  it("returns 401 for login with invalid params", async () => {

    const body = {email: "email@email.com", password: "123456" }
    await insertValidUser(body.email, body.password);
    body.password = "654321"

    const response = await supertest(app).post("/sign-in").send(body);

    expect(response.status).toEqual(401);
  })

  it("returns 400 for empty body", async () => {

    const body = {}

    const response = await supertest(app).post("/sign-in").send(body);

    expect(response.status).toEqual(400);
  })
});