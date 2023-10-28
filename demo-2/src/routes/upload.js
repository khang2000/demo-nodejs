import { Router } from "express";
import { uploadImages } from "../controllers/images";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinaryConfig";
import multer from "multer";

const routerImages = Router();
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "demo-nodejs",
    format: "jpg",
  },
});
const upload = multer({ storage: storage });
routerImages.post("/upload", upload.array("images", 10), uploadImages);

export default routerImages;
