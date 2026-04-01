import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import serviceRoutes from "./server/routes/serviceRoutes.ts";
import contactRoutes from "./server/routes/contactRoutes.ts";
import contentRoutes from "./server/routes/contentRoutes.ts";
import adminRoutes from "./server/routes/adminRoutes.ts";

dotenv.config();
// Fallback to .env.example if .env is not present (common in some dev environments)
const result = dotenv.config({ path: ".env.example" });
if (result.error) {
  console.log("No .env.example found or error loading it:", result.error.message);
} else {
  console.log(".env.example loaded successfully");
}
console.log("EMAIL_USER from env:", process.env.EMAIL_USER);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());
  app.use("/media", express.static(path.join(process.cwd(), "media")));

  // API routes
  app.use("/api/services", serviceRoutes);
  app.use("/api/contact", contactRoutes);
  app.use("/api/content", contentRoutes);
  app.use("/api/admin", adminRoutes);

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  if (process.env.NODE_ENV !== "production") {
    // Development mode: Use Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve static files from dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    // Handle SPA routing: serve index.html for all non-API routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
