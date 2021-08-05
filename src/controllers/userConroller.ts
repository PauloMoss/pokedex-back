import { Request, Response } from "express";

import * as userService from "../services/userService";
import { SaveNewUser, UserLogin } from "../protocols/userInterface"
import { singUpSchema, singInSchema } from "../schemas/userSchema";

export async function signUp(req: Request, res: Response) {
  try {

    const params = req.body as SaveNewUser;
    const err = singUpSchema.validate(params).error;
    if(err) {
      return res.sendStatus(400);
    }

    const createdUser = await userService.saveUser(params);
    if(!createdUser) return res.sendStatus(409);

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function signIn(req: Request, res: Response) {
  try{
    const params = req.body as UserLogin;
    const err = singInSchema.validate(params).error;
    if(err) {
      return res.sendStatus(400);
    }

    const token = await userService.logUser(params);
    if(!token) return res.sendStatus(401);

    res.send(token)
  } catch(e) {
    console.log(e)
    res.sendStatus(500)
  }
}