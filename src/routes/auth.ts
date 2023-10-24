import { Router } from "express";
import {
  loginUser,
  registerUser,
  recoveryPassword,
  changePassword,
  getUserProfile,
} from "../controllers/auth";
import { checkJwt } from "../middleware/session";
import { validateFields } from "../middleware/validate-fields";
import { check } from "express-validator";
import {
  existsAccountEmail,
  verifyAccountEmail,
} from "../middleware/auth-validate";

const router = Router();

router.post(
  "/register",
  [
    check("password", "el password es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").not().isEmpty(),
    check("email", "debes enviar un email vaildo").isEmail(),
  ],
  validateFields,
  verifyAccountEmail,
  registerUser,
);

router.post(
  "/login",
  [
    check("password", "el password es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").not().isEmpty(),
    check("email", "debes enviar un email vaildo").isEmail(),
  ],
  validateFields,
  loginUser,
);

router.post(
  "/recovery",
  [
    check("email", "el email es obligatorio").not().isEmpty(),
    check("email", "debes enviar un email vaildo").isEmail(),
  ],
  validateFields,
  existsAccountEmail,
  recoveryPassword,
);

router.post(
  "/recovery-password",
  [
    check("token", "el token es obligatorio").not().isEmpty(),
    check("password", "el password es obligatorio").not().isEmpty(),
  ],
  validateFields,
  changePassword,
);

router.get("/profile", checkJwt, getUserProfile);

export { router };
