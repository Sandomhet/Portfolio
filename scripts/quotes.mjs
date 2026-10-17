// Regenerates src/data/quotes.json from src/data/Quotes.xlsx (first sheet).
import xlsx from "xlsx";
import fs from "node:fs";

const dataDir = new URL("../src/data/", import.meta.url);
const workbook = xlsx.readFile(new URL("Quotes.xlsx", dataDir).pathname);
const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

fs.writeFileSync(new URL("quotes.json", dataDir), JSON.stringify(sheet));
console.log(`Wrote ${sheet.length} quotes`);
