import express from "express";

import { checkPermission } from "../middlewares/checkPermission.js";
import {
  create,
  getALL,
  getDetail,
  remove,
  update,
} from "../controllers/categories.js";
const routerCategories = express.Router();

routerCategories.get("/", getALL);
routerCategories.get("/:id", getDetail);
routerCategories.post("/", checkPermission, create);
routerCategories.put("/:id", checkPermission, update);
routerCategories.delete("/:id", checkPermission, remove);
export default routerCategories;
