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
import {
  BatchUpdateSpreadsheetRequest,
  Request,
  SetBasicFilterRequest,
  BasicFilter,
} from '@/functions/types/GoogleAppsScript';

export const myFunction = () => {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const hiddenValueList = spreadsheet.getSheetByName('hiddenValueList');
  if (!hiddenValueList) return;

  const hiddenIds = hiddenValueList
    .getRange(1, 1, hiddenValueList.getLastRow())
    .getValues()
    .flat();

  // NOTE:hiddenValuesの逆にする

  const sample = spreadsheet.getSheetByName('sample');
  if (!sample) return;

  const filterSet: BasicFilter = {
    range: {
      sheetId: sample.getSheetId(),
    },
    criteria: {
      hiddenValues: hiddenIds,
    },
  };

  const setBasicFilter: SetBasicFilterRequest = {
    filter: filterSet,
  };

  const request: Request = {
    setBasicFilter,
  };
  const batchUpdateParams: BatchUpdateSpreadsheetRequest = {
    requests: [request],
  };

  Sheets.Spreadsheets!.batchUpdate(batchUpdateParams, spreadsheet.getId());

  // TODO:configディレクトリを作る。そこからintegrationファイルを作成する
};
