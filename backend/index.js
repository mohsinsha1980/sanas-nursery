import dotenv from "dotenv";
dotenv.config({ path: "/.env" });
import bodyParser from "body-parser";
import { mustache } from "consolidate";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import config from "./config/env-config.js";
import connectDB from "./db/connection.js";
import path from "path";
import log from "./services/logger.js";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(
  process.env.BACKEND_PUBLIC_FOLDER,
  express.static(path.join(process.cwd(), "public"))
);

app.use(
  cors({
    origin: config.ALLOWED_ORIGIN.split(", "),
    credentials: true,
  })
);

app.use(helmet());
app.use(bodyParser.json());
app.engine("html", mustache);
app.set("view engine", "html");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

import adminRoutes from "./routes/admin/index.js";
import authRoute from "./routes/auth.js";
import publicRoutes from "./routes/public.js";

// import userRoutes from "./routes/user/index.js";

app.use("/api/auth", authRoute);
// app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);

// only run when next() is called   || success response
app.use((req, res) => {
  const response = {
    ...req.successResponse,
    error: false,
  };

  log({
    level: "info",
    user: req?.userData?._id || "Unknown User",
    url: req?.method + ": " + req?.originalUrl,
    message: response?.message,
  });

  return res.status(200).json(response);
});

// only run when error occurs || when next(err) is called  || error response
app.use((err, req, res, next) => {
  if (err) {
    const response = {
      error: true,
      message: err.message || "Internal Server Error",
    };

    log({
      level: err.status === 500 ? "error" : "warn",
      user: req?.userData?._id || "Unknown User",
      url: req?.method + ": " + req?.originalUrl,
      message: err.message,
    });

    return res.status(err.status || 500).json(response);
  }

  return res
    .status(500)
    .json({ error: true, message: "Internal Server Error" });
});

app.listen(config.PORT, () => {
  console.log(`✅ Server is running on port ${config.PORT}`);
  connectDB();
});
