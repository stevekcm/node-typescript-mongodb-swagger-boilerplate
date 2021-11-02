import express from "express";
import userService from "../services/userService";
const router = express.Router();

/**
 * A user account form
 * @typedef {object} entity.UserLoginForm
 * @property {string} email.required - The email
 * @property {string} password.required - The password
 */

/**
 * user logged in response
 * @typedef {object} entity.UserLoginResponse
 * @property {string} token.required - The JWT Token
 */

/**
 * user info
 * @typedef {object} entity.UserInfo
 * @property {string} email - The account's email
 * @property {string} _id - The account's id
 */

/**
 * array error message
 * @typedef {object} error.errorMessage
 * @property {string} msg - Error messages
 */

/**
 * user service error response
 * @typedef {object} error.UserResponse
 * @property {number} status - HTTP Status
 * @property {array<error.errorMessage>} errors - Error messages
 */

/**
 * Post /api/v1/user/register
 * @summary This is the service to register account.
 * @tags user
 * @param {entity.UserLoginForm} request.body.required - user account form
 * @return {object} 200 - success response - application/json
 * @return {error.UserResponse} 400 - Bad request response
 * @return {error.UserResponse} 500 - Server internal error
 */
router.post("/register", userService.register);

/**
 * Post /api/v1/user/login
 * @summary This is the service to login account.
 * @tags user
 * @param {entity.UserLoginForm} request.body.required - user account form
 * @return {entity.UserLoginResponse} 200 - success response - application/json
 * @return {error.UserResponse} 400 - Bad request response
 * @return {error.UserResponse} 500 - Server internal error
 */
router.post("/login", userService.login);

/**
 * Get /api/v1/user/get
 * @summary This is the service to get your user info.
 * @tags user
 * @return {entity.UserInfo} 200 - success response - application/json
 * @return {error.UserResponse} 401 - Unauthorized
 * @return {error.UserResponse} 500 - Server internal error
 */
router.get("/get", userService.getUser);

export default router;
