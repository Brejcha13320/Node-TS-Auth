import { Router } from "express";
import {
  loginUser,
  registerUser,
  recoveryPassword,
  changePassword,
  getUserProfile,
} from "../controllers/auth";
import { checkJwt } from "../middleware/session";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/recovery", recoveryPassword);
router.post("/recovery-password", changePassword);
router.get("/profile", checkJwt, getUserProfile);

export { router };
