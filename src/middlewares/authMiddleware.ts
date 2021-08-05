import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";

import * as authService from "../services/sessionService";

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];
    const token = authorization.split("Bearer ")[1];
    
    const validSession = authService.validateSession(token);
    if (!validSession) {
      return res.sendStatus(401);
    }
    next()
}

