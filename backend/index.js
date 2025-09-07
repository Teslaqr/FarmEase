// // index.js
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from 'cookie-parser';
// import { connectDB } from './db/connectDB.js';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// import authRoutes from "./routes/auth.route.js";
// import rentalRoutes from "./routes/rental.route.js"; // Updated to rental routes

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Get the current directory of this file
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Middleware
// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true
// }));

// app.use(express.json());
// app.use(cookieParser());

// // Serve static files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use("/api/auth", authRoutes);
// app.use("/api/rentals", rentalRoutes); // Updated endpoint

// // Connect to the database and start the server
// app.listen(PORT, () => {
//     connectDB();
//     console.log("FarmEase server is running on port", PORT);
// });
// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import authRoutes from "./routes/auth.route.js";
import rentalRoutes from "./routes/rental.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Allowed origins (local + deployed frontend)
const allowedOrigins = [
  "http://localhost:5173",                 // local dev
  "https://farm-ease-swart.vercel.app",    // Vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // allow cookies, auth headers
  })
);

app.use(express.json());
app.use(cookieParser());

// Static files (uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rentals", rentalRoutes);

// DB + server start
app.listen(PORT, () => {
  connectDB();
  console.log("✅ FarmEase server is running on port", PORT);
});
