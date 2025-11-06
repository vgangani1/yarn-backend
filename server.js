import express from "express";
import cors from "cors";
import xlsx from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS configuration
app.use(
  cors({
    origin: [
      "https://omkar-yarn.vercel.app",
      "http://localhost:3000"
    ],
    methods: ["GET"],
  })
);

// ✅ API route to serve Excel data
app.get("/api/yarn-data", (req, res) => {
  try {
    const filePath = path.join(__dirname, "data", "compny group.xlsx");
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    res.json(jsonData);
  } catch (error) {
    console.error("Error reading Excel file:", error);
    res.status(500).json({ error: "Failed to read Excel file" });
  }
});

// ✅ Root check
app.get("/", (req, res) => {
  res.send("🧶 Omkar Yarn Backend is running successfully!");
});

app.listen(PORT, () => console.log(`✅ Server live on port ${PORT}`));
