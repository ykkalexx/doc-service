import express from "express";
import cors from "cors";
import { db } from "./db/db";
import router from "./routes";

const app = express();
const port = process.env.DOC_PORT || 8004;

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("/health", (_, res) => {
  res.json({ status: "ok", service: "document-service" });
});

const startServer = async () => {
  try {
    await db.init().catch((err) => {
      console.error("Failed to initialize database:", err);
      process.exit(1);
    });

    app.listen(port, () => {
      console.log(`Document service running on port ${port}`);
      console.log(`Health check available at http://localhost:${port}/health`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  process.exit(0);
});
