import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import productRoutes from "./routes/productRoute.js"; // Importing product routes
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000; // Default to 5000 if PORT is not set in .env
const __dirname = path.resolve(); // Get the current directory name

app.use(express.json()); //express.json() is a built-in middleware function in Express. It parses incoming requests with JSON payloads
app.use(cors()); //cors is a package that allows you to enable Cross-Origin Resource Sharing (CORS) in your Express app
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
); //helmet is a security middleware that helps protect your apps by setting various HTTP headers
app.use(morgan("dev")); //morgan logs the HTTP requests to the console

app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 }); // Deduct 5 tokens from the bucket
    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimited()) {
        res
          .status(429)
          .json({ error: "Too many requests, please try again later." });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Access denied for bots." });
      } else {
        res.status(403).json({ error: "Access denied." });
      }
      return;
    }

    //check for spoofed bots
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ error: "Spoofed Bots detected." });
      return;
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("ArcJet error:", error);
    next(error); // Pass the error to the next middleware
  }
});

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

async function initDB() {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(455) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing the database:", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port" + PORT);
  });
});
