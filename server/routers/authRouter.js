import express from "express";
import {
  getUser,
  resetPassword,
  resetPasswordRequest,
  signIn,
  signUp,
  verifyResetPasswordRequest,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.get("/refresh");
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-up", signUp);
authRouter.post("/reset-password-request", resetPasswordRequest);
authRouter.get("/verify-reset-password-request", verifyResetPasswordRequest);
authRouter.post("/reset-password", resetPassword);
authRouter.get("/:userId", getUser);

export default authRouter;
