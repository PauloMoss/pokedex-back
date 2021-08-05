import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../../src/entities/User";

export function createUser () {
  const user = {
    email: "email@email.com",
    password: "123456",
    confirmPassword: "123456"
  };

  return user;
}

export async function insertValidUser() {

  const cryptedPassword = bcrypt.hashSync("123456", 10);

  const body = {email: "email@email.com", password: cryptedPassword };
  await getRepository(User).insert(body)
}
