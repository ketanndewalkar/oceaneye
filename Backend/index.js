import express, { urlencoded } from "express";
import connectdb from "./src/db/index.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// import all routes

import userRoutes from "./src/routes/user.routes.js";
import reportRoutes from "./src/routes/reports.routes.js";
import validateRoutes from "./src/routes/validate.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import hotspotRoutes from "./src/routes/hotspot.routes.js"

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);
app.use(cookieParser());

const PORT = process.env.PORT;

// All routes structure
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/validate", validateRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use('/api/v1/hotspot',hotspotRoutes)

connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error", err);
  });
