import { UserDocLean } from "../models/user";

declare module "express-serve-static-core" {
  export interface Request {
    User: UserDocLean;
  }
}
