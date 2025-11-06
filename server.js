import express from "express";
import cors from "cors";
import xlsx from "xlsx";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Allow frontend access
app.use(
  cors({
    origin: [
      "https://omkar-yarn.vercel.app",
      "http://localhost:3000"
    ],
    methods: ["GET"],
  })
);

// ✅ Yarn Data API endpoint
app.get("/yarn-data", (req, res) => {
  try {
    const filePath = path.join(__dirname, "data", "compny group.xlsx");

    if (!fs.existsSync(filePath)) {
      console.error("Excel file not found at:", filePath);
      return res.status(404).json({ error: "Excel file not found" });
    }

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error reading Excel file:", error);
    res.status(500).json({ error: "Error reading Excel file" });
  }
});

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("🧶 Omkar Yarn Backend is running successfully!");
});

// ✅ Export app for Vercel
export default app;
