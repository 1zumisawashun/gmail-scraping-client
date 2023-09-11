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
import { createSheet } from './create-sheet';
import { sendToSlack } from '@/functions/helpers';

export const getSheet = ({
  date,
  spreadsheet,
}: {
  date: string;
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet | undefined;
}) => {
  if (!spreadsheet) {
    sendToSlack('エラーが発生したワン🐶');
    return undefined;
  }

  const sheet = spreadsheet.getSheetByName(date);

  if (!sheet) {
    const newSheet = createSheet(date, spreadsheet);
    return newSheet;
  }

  return sheet;
};
