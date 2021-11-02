import { NextFunction, Request, Response } from "express";
import userController from "../controllers/userController";

const bypassPaths = ["/user/register", "/user/login"];

export default async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    if (bypassPaths.find((p) => p === req.path)) {
      return next();
    }

    if (!req.header("authorization"))
      return res.status(401).json({
        errors: [{ msg: "Missing token, failed to authenticate" }],
        date: Date.now,
        status: 401,
      });

    req.User = await userController.getUserInfo(req.headers.authorization);

    if (!req.User)
      return res.status(401).json({
        errors: [{ msg: "Invalid token, failed to authenticate" }],
        date: Date.now,
        status: 401,
      });

    next();
  } catch (err) {
    next(err);
  }
}
