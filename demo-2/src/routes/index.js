import express from "express";
const router = express.Router();
import routerProduct from "./product.js";
import routerAuth from "./auth.js";
import routerCategories from "./categories.js";
import routerImages from "./upload.js";

router.use("/product", routerProduct);
router.use("/auth", routerAuth);
router.use("/categories", routerCategories);
router.use("/images", routerImages);
export default router;
