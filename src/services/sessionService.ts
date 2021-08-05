import { getRepository } from "typeorm";
import { v4 as uuid } from "uuid";

import Session from "../entities/Session";
import User from "../entities/User";

export async function createSession(user: User) {
 
    const repository = getRepository(Session);

    const sessionId = (await repository.insert({ userId: user.id, token: uuid() })).generatedMaps[0].id;

    return await repository.findOne({ where: { id: sessionId}});
}

export async function validateSession(token: string) {

    const repository = getRepository(Session);

    const userSession = await repository.findOne({ where: { token }})
    if(!userSession) return null

    return userSession;
}