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
import { Sheet, Range } from '@/functions/types/GoogleAppsScript';

export const updateSummarySheetByValues = ({
  sheet,
  values,
}: {
  sheet: Sheet;
  values: unknown[][];
}) => {
  const lastRow = sheet.getLastRow();
  let updateRange: Range;

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
