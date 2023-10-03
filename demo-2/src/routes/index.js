import express from "express";
const router = express.Router();
import routerProduct from "./product.js";

router.use("/product", routerProduct);
export default router;
