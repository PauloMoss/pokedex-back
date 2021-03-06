import { Request, Response, NextFunction } from "express";

import * as authService from "../services/sessionService";

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try{
    const authorization = req.headers['authorization'];
    const token = authorization.split("Bearer ")[1];
    
    const validSession = await authService.validateSession(token);
    if (!validSession) {
      return res.sendStatus(401);
    }
    
    res.locals.userId = validSession.userId
    next()
    } catch(e) {
      console.log(e)
      res.sendStatus(500)
    }
}

