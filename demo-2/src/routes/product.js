import express from "express";
import {
  create,
  getALL,
  getDetail,
  remove,
  update,
} from "../controllers/product.js";
const router = express.Router();

router.get("/", getALL);
router.get("/:id", getDetail);
router.post("/", create);
router.put("/", update);
router.delete("/", remove);
export default router;
