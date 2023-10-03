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
import { Gmail } from '@/features/client/client.type';
import {
  getSpreadsheetByName,
  createSpreadsheetByName,
} from '@/functions/helpers/spreadsheet';
import { getSheetByName, createSheetByName } from '@/functions/helpers/sheet';
import { sendToSlack } from '@/functions/helpers';

export const updateClientSheet = ({ gmail }: { gmail: Gmail }) => {
  const { date } = gmail;

  let spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet | undefined;

  spreadsheet = getSpreadsheetByName({ name: date });
  if (!spreadsheet) {
    spreadsheet = createSpreadsheetByName({ name: date });
  }

  let sheet: GoogleAppsScript.Spreadsheet.Sheet | undefined;

  sheet = getSheetByName({ name: date, spreadsheet });
  if (!sheet) {
    sheet = createSheetByName({ name: date, spreadsheet });
  }

  if (!sheet) {
    sendToSlack('エラーが発生したワン🐶');
    return;
  }

  const { dateTime, email, subject, category, skill, body } = gmail;
  sheet.appendRow([dateTime, email, subject, category, skill, body]);
};
