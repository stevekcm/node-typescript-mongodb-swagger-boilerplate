import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import validator from "../middleware/validator";
import { infoLogger } from "../logger/logger";
import userController from "../controllers/userController";
import authController from "../controllers/authController";
const rules = {
  email: body("email").isEmail().withMessage("Invalid Email"),
  password: body("password")
    .matches(/^[a-z][a-z0-9]*$/i)
    .withMessage(
      "Password must contains upper case letter, lower case letter, number, and at least 8 characters"
    ),
};

const register = [
  rules.email,
  rules.password,
  validator,
  async (req: Request, res: Response, next: NextFunction) => {
    if (await userController.isUserExist(req.body.email)) return res.status(401).send();

    try {
      await userController.create(req.body.email, req.body.password);

      return res.status(200).end();
    } catch (e) {
      infoLogger.error(`Failed to register email ${req.body.email}`, e);
      next(e);
    }
  },
];

const login = [
  rules.email,
  rules.password,
  validator,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userController.isUserExist(req.body.email);

    if (!user) return res.status(401).end();

    if (!(await authController.passwordVerify(user, req.body.password)))
      return res.status(401).end();

    return res.status(200).json({
      token: await authController.generateJWT(user),
    });
  },
];

const getUser = [
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send(req.User);
  },
];

export default {
  register,
  login,
  getUser,
};
