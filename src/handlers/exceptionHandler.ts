import { NextFunction, Request, Response } from "express";

import { infoLogger } from "../logger/logger";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function exceptionHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Global Error Caught", err.stack);
  infoLogger.error(`Error Caught ${err.stack}`);
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    errors: [{ msg: err.message }],
  });
}
