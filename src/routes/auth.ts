import { Router } from "express";
import { loginUser, registerUser, refreshToken } from "../controllers/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);

export { router };
