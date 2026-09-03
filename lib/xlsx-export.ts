import ExcelJS from "exceljs";

export type XlsxColumn = {
  header: string;
  key: string;
  width?: number;
  /** Horizontal alignment for both the header and data cells. Defaults to "center". */
  align?: "left" | "center" | "right";
};

/** ARGB fill colors keyed by the raw cell value, e.g. status pill colors. */
export type CellColorMap = Record<string, { fg: string; bg: string }>;

export type XlsxSheet = {
  sheetName: string;
  columns: XlsxColumn[];
  rows: Record<string, string | number>[];
  /** Per-column value -> {fg,bg} ARGB color map, e.g. status pill colors. */
  colorByColumnKey?: Record<string, CellColorMap>;
};

const HEADER_FILL = "FF2A78D6";
const HEADER_FONT = "FFFFFFFF";
const BORDER_COLOR = "FFE1E0D9";
const ZEBRA_FILL = "FFF9F9F7";
const TEXT_COLOR = "FF0B0B0B";

function addStyledSheet(workbook: ExcelJS.Workbook, { sheetName, columns, rows, colorByColumnKey = {} }: XlsxSheet) {
  const sheet = workbook.addWorksheet(sheetName, {
    views: [{ state: "frozen", ySplit: 1, showGridLines: false }],
  });

  sheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.key,
    width: col.width ?? Math.max(col.header.length + 4, 12),
  }));

  sheet.addRows(rows);

  const thinBorder = { style: "thin" as const, color: { argb: BORDER_COLOR } };
  const cellBorder = { top: thinBorder, left: thinBorder, bottom: thinBorder, right: thinBorder };

  const headerRow = sheet.getRow(1);
  headerRow.height = 22;
  headerRow.eachCell((cell, colNumber) => {
    cell.font = { bold: true, color: { argb: HEADER_FONT }, size: 11 };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: HEADER_FILL } };
    cell.alignment = { vertical: "middle", horizontal: columns[colNumber - 1]?.align ?? "center" };
    cell.border = cellBorder;
  });

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;

    row.height = 18;
    row.eachCell((cell, colNumber) => {
      cell.font = { color: { argb: TEXT_COLOR }, size: 11 };
      cell.alignment = { vertical: "middle", horizontal: columns[colNumber - 1]?.align ?? "center" };
      cell.border = cellBorder;

      if (rowNumber % 2 === 0) {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: ZEBRA_FILL } };
      }

      const columnKey = columns[colNumber - 1]?.key;
      const colorMap = columnKey ? colorByColumnKey[columnKey] : undefined;
      const colors = colorMap?.[String(cell.value)];
      if (colors) {
        cell.font = { color: { argb: colors.fg }, bold: true, size: 11 };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: colors.bg } };
      }
    });
  });

  return sheet;
}

export async function createStyledMultiSheetWorkbookBuffer(sheets: XlsxSheet[]): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "coocon";
  workbook.created = new Date();

  for (const sheet of sheets) {
    addStyledSheet(workbook, sheet);
  }

  const arrayBuffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(arrayBuffer);
}

export async function createStyledWorkbookBuffer(sheet: XlsxSheet): Promise<Buffer> {
  return createStyledMultiSheetWorkbookBuffer([sheet]);
}

export function xlsxResponse(buffer: Buffer, filename: string): Response {
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
