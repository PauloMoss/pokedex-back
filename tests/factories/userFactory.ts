import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../../src/entities/User";
import Session from "../../src/entities/Session";

export function createUser () {
  const user = {
    email: "email@email.com",
    password: "123456",
    confirmPassword: "123456"
  };

  return user;
}

export async function insertValidUser(email:string, password: string) {

  const cryptedPassword = bcrypt.hashSync(password, 10);

  const body = {email, password: cryptedPassword };
  await getRepository(User).insert(body)
}

export async function insertFakeSession(userId:number, token:string) {

  await getRepository(Session).insert({userId, token})
}

export async function userValidLogin() {

    const body = {email: "email@email.com", password: "123456" }
    await insertValidUser(body.email, body.password);
    await insertFakeSession(1, "MeuTokenFake");

    return 'Bearer MeuTokenFake';
}