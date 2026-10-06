import express from "express";
import sanitize from "sanitize";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import router from "./routes/index.js";

import { errorHandler } from "./middleware/ErrorHandlerMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitize.middleware);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/admin", router);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
