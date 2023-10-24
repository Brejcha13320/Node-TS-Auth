import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  updateCategory,
  getCategoriesSearch,
} from "../controllers/category";
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/", checkJwt, getCategories);
router.get("/:id", checkJwt, getCategory);

/**
 * FIXME: Esta ruta necesita una validacion de express-validator urgente
 * porque si no llega el term se rompe, igual con todas la rutas que reciben parametros
 */
router.get("/search/:term", checkJwt, getCategoriesSearch);

router.post("/", checkJwt, createCategory);
router.put("/:id", checkJwt, updateCategory);
router.delete("/:id", checkJwt, deleteCategory);

export { router };
