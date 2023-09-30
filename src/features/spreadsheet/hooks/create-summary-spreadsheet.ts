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
import { GMAIL_SCRAPING_CLIENT_SUMMARY_FOLDER_ID } from '@/functions/constants';
import { createSpreadsheet } from './create-spreadsheet';
import { getSpreadsheet } from './get-spreadsheet';
import { getSheet } from '@/features/sheet/hooks';
import {
  sendToSlack,
  getTwoDaysAgo,
  getToday,
  getYesterday,
} from '@/functions/helpers';

export const updateSummarySpreadsheet = ({ date }: { date: string }) => {
  // get summary sheet
  const summarySheetId = '1W9_TSJk8sYW8wey_wTadeDLp_XnIBYSV2Xq4DFIghZo';
  const summarySheet = SpreadsheetApp.openById(summarySheetId);
  const summaryActiveSheet = summarySheet.getActiveSheet();
  const twoDaysAgo = getTwoDaysAgo();
  const yesterday = getYesterday();
  const today = getToday();

  // rename summary sheet
  summaryActiveSheet.setName(`${twoDaysAgo}〜${today}`);

  // get yesterday all cell data
  const spreadsheet = getSpreadsheet({ date: twoDaysAgo });
  if (!spreadsheet) return;
  const sheet = getSheet({ spreadsheet, date: twoDaysAgo });
  if (!sheet) return;
  const lastRow = sheet.getLastRow();
  //指定したセル範囲を取得する
  const range = sheet.getRange(2, 1, lastRow, 4);
  const values = range.getValues();
  // move to summary file

  // const yesterdaySpreadsheet = getSpreadsheet({ date: yesterday });
  // if (!yesterdaySpreadsheet) return;
  // const yesterdaySheet = yesterdaySpreadsheet.getSheetByName(yesterday);
  // const range = yesterdaySheet!.getDataRange();
  // const values = range.getValues();

  sendToSlack('エラーが発生したワン🐶');
};
