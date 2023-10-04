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
import { Sheet } from '@/functions/types/GoogleAppsScript';

export const resetIntegrationSheet = ({
  sheet,
  name,
}: {
  sheet: Sheet;
  name: string;
}) => {
  sheet.setName(name); // rename integration sheet

  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  const deleteRange = sheet.getRange(2, 1, lastRow, lastColumn);
  deleteRange.clearContent();
};
