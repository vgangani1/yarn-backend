import express from "express";
import cors from "cors";
import xlsx from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Fix: Allow your frontend to access this API
app.use(
  cors({
    origin: [
      "https://omkar-yarn.vercel.app", // frontend URL
      "http://localhost:3000", // for local testing
    ],
    methods: ["GET"],
  })
);

app.use(express.json());

// ✅ Read the Excel file and convert it to JSON
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

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Yarn Backend Running Successfully 🧶");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
