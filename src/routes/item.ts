import { Router } from "express";
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
} from "../controllers/item";
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/", checkJwt, getItems);
router.get("/:id", checkJwt, getItem);
router.post("/", checkJwt, createItem);
router.put("/:id", checkJwt, updateItem);
router.delete("/:id", checkJwt, deleteItem);

export { router };
