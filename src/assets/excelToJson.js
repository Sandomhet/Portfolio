const xlsx = require('xlsx');
const fs = require('fs');

const workbook = xlsx.readFile("Quotes.xlsx");
const sheetName = workbook.SheetNames[0];
const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

fs.writeFileSync("quoteStorage.json", JSON.stringify(sheet));