import express from "express";
import sanitize from "sanitize";
import dotenv from "dotenv/config";
import router from "./routes/index.js";
import cors from "cors";
import multer from "multer";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use(sanitize.middleware);
app.use(cors());
app.use("/api/admin", router);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);

// Upload route
app.use("/api", uploadRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
