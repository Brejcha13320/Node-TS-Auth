import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
  res.send({ data: "aqui va la data" });
});

export { router };
