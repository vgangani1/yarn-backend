import express from "express";
import cors from "cors";
import xlsx from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: [
      "https://omkar-yarn.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET"],
  })
);

// ✅ Yarn data API
app.get("/yarn-data", (req, res) => { ... });
  try {
    const excelPath = path.resolve("./data/compny group.xlsx");
    const workbook = xlsx.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    res.status(200).json(data);
  } catch (err) {
    console.error("Excel read error:", err);
    res.status(500).json({ error: "Cannot read Excel file" });
  }
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🧶 Omkar Yarn Backend is running successfully!");
});

// ✅ Export (IMPORTANT for Vercel)
export default app;
