import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  updateCategory,
} from "../controllers/category";
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/", checkJwt, getCategories);
router.get("/:id", checkJwt, getCategory);
router.post("/", checkJwt, createCategory);
router.put("/:id", checkJwt, updateCategory);
router.delete("/:id", checkJwt, deleteCategory);

export { router };
