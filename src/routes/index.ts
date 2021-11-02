import express from "express";
import authenticate from "../middleware/authenticate";
import userRoute from "../routes/userRoute";

const router = express.Router();

router.use(authenticate);
router.use("/user", userRoute);

export default router;
