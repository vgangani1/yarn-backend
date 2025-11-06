import express from "express";
import cors from "cors";
import XLSX from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 4000;

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCEL_PATH = "Z:\\VASU\\omkar-yarn-manager\\Backend\\data\\compny group.xlsx";


const readExcel = () => {
  try {
    const workbook = XLSX.readFile(EXCEL_PATH);
    const sheetName = workbook.SheetNames[0];
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "" });
    return sheet;
  } catch (err) {
    console.error("Error reading Excel:", err.message);
    return [];
  }
};

app.get("/data", (req, res) => {
  const data = readExcel();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
  console.log(`📄 Reading Excel: ${EXCEL_PATH}`);
});
