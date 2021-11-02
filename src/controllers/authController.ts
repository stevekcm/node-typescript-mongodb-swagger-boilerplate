import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDocLean } from "../models/user";

const generateJWT = async (user: UserDocLean) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT Secret Key Not Found!");

  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};

const passwordHash = async (passwordPlan: string) => {
  return await bcrypt.hash(passwordPlan, 10);
};

const passwordVerify = async (user: UserDocLean, passwordPlan: string) => {
  const rst = await bcrypt.compare(passwordPlan, user.password);
  return rst;
};

export default {
  generateJWT,
  passwordHash,
  passwordVerify,
};
