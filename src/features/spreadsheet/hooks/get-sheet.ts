import { createSheet } from './create-sheet';

export const getSheet = ({
  date,
  spreadsheet,
}: {
  date: string;
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet | undefined;
}) => {
  if (!spreadsheet) {
    // sendToSlack(params, "spreadsheetが見つからなかったかに！");
    return;
  }

  const sheet = spreadsheet.getSheetByName(date);

  if (!sheet) {
    const newSheet = createSheet(date, spreadsheet);
    return newSheet;
  }

  return sheet;
};
