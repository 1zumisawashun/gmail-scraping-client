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
import { Gmail } from '@/features/gmail/gmail.type';

export const updateSheet = ({
  gmail,
  sheet,
}: {
  gmail: Gmail;
  sheet?: GoogleAppsScript.Spreadsheet.Sheet;
}) => {
  if (!sheet) return;

  // const lastrow = sheet.getLastRow();
  // const lastcol = sheet.getLastColumn();

  // const values = sheet.getRange(lastrow, 1, 1, lastcol).getValues().flat();

  // const syukkin = values[1];
  // const taikin = values[2];

  // // NOTE:まだ退勤していない場合（6/1 9:00に出勤して6/1 12:00に出勤した場合）
  // if (syukkin && !taikin) {
  //   const message = `まだ退勤していないかに！（${dateFullYearMonthDayTime}）`;
  //   sendToSlack(params, message);
  //   return;
  // }

  const { datetime, email, subject } = gmail;
  sheet.appendRow([datetime, email, subject]);

  // const message = getRandomValue(syukkin_messages);
  // sendToSlack(params, `${message}（${dateFullYearMonthDayTime}）`);
};
