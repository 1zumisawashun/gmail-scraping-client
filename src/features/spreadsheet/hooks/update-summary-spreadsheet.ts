/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { GMAIL_SCRAPING_CLIENT_SUMMARY_SPREADSHEET_ID } from '@/functions/constants';
import { getSpreadsheet } from './get-spreadsheet';
import { getSheet } from '@/features/sheet/hooks';
import {
  sendToSlack,
  getTwoDaysAgo,
  getToday,
  getYesterday,
} from '@/functions/helpers';

const getSummarySheet = () => {
  const summarySheet = SpreadsheetApp.openById(
    GMAIL_SCRAPING_CLIENT_SUMMARY_SPREADSHEET_ID
  );
  const summaryActiveSheet = summarySheet.getActiveSheet();
  return summaryActiveSheet;
};

const resetSummarySpreadsheet = ({
  sheet,
  sheetName,
}: {
  sheet: GoogleAppsScript.Spreadsheet.Sheet;
  sheetName: string;
}) => {
  sheet.setName(sheetName); // rename summary sheet

  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  const deleteRange = sheet.getRange(2, 1, lastRow, lastColumn);
  deleteRange.clearContent();
};

/**
 * @description A2を起点にしてデータのある最終行・最終列のデータを取得する
 * @description getRange(行、列、行数、列数）
 * @see https://hajiritsu.com/gas-spreadsheet-getrange/
 */
const getValuesByDate = ({ date }: { date: string }) => {
  const spreadsheet = getSpreadsheet({ date });
  if (!spreadsheet) return undefined;
  const sheet = getSheet({ spreadsheet, date });
  if (!sheet) return undefined;

  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  const range = sheet.getRange(2, 1, lastRow, lastColumn);
  return range.getValues();
};

const updateSummarySpreadsheetByValues = ({
  sheet,
  values,
}: {
  sheet: GoogleAppsScript.Spreadsheet.Sheet;
  values: any[][];
}) => {
  const lastRow = sheet.getLastRow();
  let updateRange: GoogleAppsScript.Spreadsheet.Range;

  if (lastRow === 1) {
    updateRange = sheet.getRange(2, 1, values.length, values[0].length);
  } else {
    updateRange = sheet.getRange(
      lastRow + 1,
      1,
      values.length,
      values[0].length
    );
  }

  updateRange.setValues(values);
};

export const updateSummarySpreadsheet = () => {
  const twoDaysAgo = getTwoDaysAgo();
  const yesterday = getYesterday();
  const today = getToday();

  const summarySheet = getSummarySheet();

  resetSummarySpreadsheet({
    sheet: summarySheet,
    sheetName: `${twoDaysAgo}〜${today}`,
  });

  const twoDaysAgoValues = getValuesByDate({ date: twoDaysAgo });
  const yesterdayValues = getValuesByDate({ date: yesterday });

  if (twoDaysAgoValues) {
    updateSummarySpreadsheetByValues({
      sheet: summarySheet,
      values: twoDaysAgoValues,
    });
  }
  if (yesterdayValues) {
    updateSummarySpreadsheetByValues({
      sheet: summarySheet,
      values: yesterdayValues,
    });
  }

  sendToSlack('サマリーを更新したワン🐶');
};
