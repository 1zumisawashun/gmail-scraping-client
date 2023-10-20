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
import { getSpreadsheetByName } from '@/functions/helpers/spreadsheet';
import { sendToSlack } from '@/functions/helpers/slack';

export const skillFilter = () => {
  const spreadsheet = getSpreadsheetByName({ name: 'Sample' });
  if (!spreadsheet) {
    sendToSlack('spreadsheetが見つからなかったワン🐶');
    return;
  }
  const hiddenValueList = spreadsheet.getSheetByName('hiddenValueList');
  if (!hiddenValueList) {
    sendToSlack('hiddenValueListが見つからなかったワン🐶');
    return;
  }

  const hiddenIds = hiddenValueList
    .getRange(1, 1, hiddenValueList.getLastRow())
    .getValues()
    .flat();

  // NOTE:hiddenValuesの逆にする

  const filterSet: any = {};

  filterSet.range = {
    sheetId: spreadsheet.getSheetId(),
  };

  filterSet.criteria = {};

  const columnIndex = 0;

  filterSet.criteria[columnIndex] = {
    hiddenValues: hiddenIds,
  };

  const request = {
    setBasicFilter: {
      filter: filterSet,
    },
  };

  const batchUpdateParams = {
    requests: [request],
  };

  if (!Sheets.Spreadsheets) {
    sendToSlack('Sheets.Spreadsheetsが見つからなかったワン🐶');
    return;
  }

  Sheets.Spreadsheets.batchUpdate(batchUpdateParams, spreadsheet.getId());
};
