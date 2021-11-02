import jwt from "jsonwebtoken";
import UserModel, { UserJWTPayLoad } from "../models/user";
import authController from "./authController";

const create = async (email: string, plainPassword: string) => {
  return await UserModel.create({
    email: email,
    password: await authController.passwordHash(plainPassword),
  });
};

const isUserExist = async (email: string) => {
  return await UserModel.findOne({
    email: email,
  }).lean();
};

const getUserInfo = async (JWT: string) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT Secret Key Not Found!");
  const user = jwt.verify(JWT, process.env.JWT_SECRET) as UserJWTPayLoad;

  return await UserModel.findOne({
    _id: user._id,
    email: user.email,
  }).lean();
};

export default {
  create,
  isUserExist,
  getUserInfo,
};
