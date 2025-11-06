import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ FIXED: Correct CORS setup for frontend and local dev
app.use(
  cors({
    origin: [
      "https://omkar-yarn.vercel.app", // your frontend URL
      "http://localhost:3000", // for local development
    ],
    methods: ["GET"],
  })
);

app.use(express.json());

// ✅ Serve your Excel/JSON data file from the "data" folder
app.get("/api/yarn-data", (req, res) => {
  try {
    const filePath = path.join(__dirname, "data", "yarnData.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.json(data);
  } catch (err) {
    console.error("Error reading yarn data:", err);
    res.status(500).json({ error: "Failed to load yarn data" });
  }
});

// ✅ Root endpoint
app.get("/", (req, res) => {
  res.send("Yarn Backend Running Successfully 🧶");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
