import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../entities/User";
import * as sessionService from "./sessionService";
import { SaveNewUser, UserLogin } from "../protocols/userInterface"

export async function saveUser (params: SaveNewUser) {

  const { email, password } = params
  const existentingUser = await findUserByEmail(email);

  if(existentingUser) return null;

  const cryptedPassword = bcrypt.hashSync(password, 10);
  const repository = getRepository(User);
  await repository.insert({ email, password: cryptedPassword });
  
  return true;
}


export async function logUser(params: UserLogin) {
  const user = await findUserByEmail(params.email);

  if(user && bcrypt.compareSync(params.password, user.password)){

    return await sessionService.createSession(user)
  }
  return null;
}



async function findUserByEmail(email:string) {

  const repository = getRepository(User);
  
  return await repository.findOne({ where: { email }});;
}