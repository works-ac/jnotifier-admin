import * as XLSX from "xlsx";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { validateBulkJobRow } from "../data/schema/BulkJobSchema";

dayjs.extend(customParseFormat);

const DATA_START_INDEX = 6; // 0-based index for Excel row 7
const MAX_JOBS = 25;

/**
 * Normalizes different date formats into YYYY-MM-DD
 */
function normalizeDate(val) {
  if (!val) return "";
  if (val instanceof Date) {
    return dayjs(val).format("YYYY-MM-DD");
  }

  const str = String(val).trim();
  const formats = [
    "YYYY-MM-DD",
    "DD-MM-YYYY",
    "D-M-YYYY",
    "YYYY/MM/DD",
    "DD/MM/YYYY",
    "MM-DD-YYYY",
    "MM/DD/YYYY",
  ];

  for (const fmt of formats) {
    const d = dayjs(str, fmt, true);
    if (d.isValid()) {
      return d.format("YYYY-MM-DD");
    }
  }

  const fallback = dayjs(str);
  if (fallback.isValid()) {
    return fallback.format("YYYY-MM-DD");
  }

  return str;
}

/**
 * Parses an Excel file and returns an array of job application objects with validation details
 * @param {File} file
 * @returns {Promise<Array>}
 */
export async function parseBulkJobExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {
          type: "array",
          cellDates: true,
          dateNF: "yyyy-mm-dd",
        });

        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          throw new Error("Excel file does not contain any sheets.");
        }

        const worksheet = workbook.Sheets[firstSheetName];
        const rawRows = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          raw: false,
          defval: "",
        });

        if (!rawRows || rawRows.length <= DATA_START_INDEX) {
          throw new Error(
            "No job records found in uploaded Excel file. Data rows should start at row 7.",
          );
        }

        const parsedRows = [];
        for (let i = DATA_START_INDEX; i < rawRows.length; i++) {
          const row = rawRows[i];
          if (!row || !Array.isArray(row)) continue;

          // Check if row has any non-empty cell
          const hasData = row.some(
            (c) => c !== undefined && c !== null && String(c).trim() !== "",
          );
          if (!hasData) continue;

          if (parsedRows.length >= MAX_JOBS) {
            throw new Error(
              `Maximum ${MAX_JOBS} jobs are allowed at a time from the template.`,
            );
          }

          const rawStartDate = row[4];
          const rawEndDate = row[5];

          const item = {
            id: `row-${i + 1}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            rowNumber: i + 1,
            title: String(row[1] || "").trim(),
            shortDescription: String(row[2] || "").trim(),
            tags: String(row[3] || "").trim(),
            applicationStartDate: normalizeDate(rawStartDate),
            applicationEndDate: normalizeDate(rawEndDate),
            advNo: String(row[6] || "").trim(),
            applyLink: String(row[7] || "").trim(),
            status: true,
          };

          const validation = validateBulkJobRow(item);
          item.isValid = validation.isValid;
          item.errors = validation.errors;

          parsedRows.push(item);
        }

        if (parsedRows.length === 0) {
          throw new Error("No job application records found in the Excel file.");
        }

        resolve(parsedRows);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read the Excel file."));
    };

    reader.readAsArrayBuffer(file);
  });
}
