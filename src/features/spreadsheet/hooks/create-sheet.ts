import { COPY_NAME } from '@/functions/constants';
export const createSheet = (
  date: string,
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet
) => {
  const copySheet = spreadsheet.getSheetByName(COPY_NAME);

  if (!copySheet) {
    // sendToSlack(params, "createSheetに失敗したかに！");
    return;
  }

  const newSheet = copySheet.copyTo(spreadsheet);
  newSheet.setName(date);
  return newSheet;
};
