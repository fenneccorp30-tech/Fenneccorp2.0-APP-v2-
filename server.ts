import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import serviceRoutes from "./server/routes/serviceRoutes";
import contactRoutes from "./server/routes/contactRoutes";
import contentRoutes from "./server/routes/contentRoutes";
import adminRoutes from "./server/routes/adminRoutes";

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
