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
import { getSpreadsheet } from './get-spreadsheet-by-name';
import { getSheet } from '../sheet/get-sheet-by-name';
/**
 * @description A2を起点にしてデータのある最終行・最終列のデータを取得する
 * @description getRange(行、列、行数、列数）
 * @see https://hajiritsu.com/gas-spreadsheet-getrange/
 */
export const getAllByName = ({ name }: { name: string }) => {
  const spreadsheet = getSpreadsheet({ name });
  if (!spreadsheet) return undefined;
  const sheet = getSheet({ spreadsheet, name });
  if (!sheet) return undefined;

  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  const range = sheet.getRange(2, 1, lastRow, lastColumn);
  return range.getValues();
};
