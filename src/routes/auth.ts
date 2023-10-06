import { Router } from "express";
import {
  loginUser,
  registerUser,
  refreshToken,
  recoveryPassword,
  changePassword,
} from "../controllers/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/recovery", recoveryPassword);
router.post("/recovery-password", changePassword);
router.post("/refresh-token", refreshToken);

export { router };
