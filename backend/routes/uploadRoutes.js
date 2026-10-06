import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import { uploadImages } from "../controllers/uploadController.js";
import { authenticatedUser } from "../middleware/authentication.js";

const router = express.Router();

router.post(
  "/upload",
  upload.array("images", 4),
  uploadImages
);

export default router;