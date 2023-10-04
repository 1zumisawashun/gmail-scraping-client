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
import { GMAIL_SCRAPING_CLIENT_INTEGRATION_SPREADSHEET_ID } from '@/functions/constants';
import { getSpreadsheetById } from '@/functions/helpers/spreadsheet';

export const getOldIntegrationSheet = () => {
  const id = GMAIL_SCRAPING_CLIENT_INTEGRATION_SPREADSHEET_ID;
  const spreadsheet = getSpreadsheetById({ id });
  const sheets = spreadsheet.getSheets(); // すべてのシートを配列で取得
  return sheets[0]; // 一番左のシートを返す
};
