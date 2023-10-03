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
import { GMAIL_SCRAPING_CLIENT_SUMMARY_SPREADSHEET_ID } from '@/functions/constants';
import { getSpreadsheetById } from '@/functions/helpers/spreadsheet';
import { getSheetByName } from '@/functions/helpers/sheet';
import { getTwoDaysAgo, getToday, sendToSlack } from '@/functions/helpers';

export const updateSummarySheet = ({ gmail }: { gmail: Gmail }) => {
  const { dateTime, email, subject, category, skill, body } = gmail;

  const id = GMAIL_SCRAPING_CLIENT_SUMMARY_SPREADSHEET_ID;

  const twoDaysAgo = getTwoDaysAgo();
  const today = getToday();
  const name = `${twoDaysAgo}〜${today}`;

  const spreadsheet = getSpreadsheetById({ id });
  const sheet = getSheetByName({ name, spreadsheet });

  if (!sheet) {
    sendToSlack('エラーが発生したワン🐶');
    return;
  }

  sheet.appendRow([dateTime, email, category, skill, subject, body]);
};
