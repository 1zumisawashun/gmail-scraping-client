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
  getClientGmail,
  getClientSheet,
  getSummarySheet,
  updateSheetByGmail,
} from './hooks';
import { sendToSlack } from '@/functions/helpers/slack';

export const client = () => {
  const gmails = getClientGmail();

  if (gmails.length === 0) return;

  sendToSlack(`取得数は${gmails.length}件だったワン🐶`);

  const clientSheet = getClientSheet();

  if (clientSheet) {
    gmails.forEach(gmail => {
      updateSheetByGmail({ gmail, sheet: clientSheet });
    });
  } else {
    sendToSlack('client-sheetが見つからなかったワン🐶');
  }

  const summarySheet = getSummarySheet();

  if (summarySheet) {
    gmails.forEach(gmail => {
      updateSheetByGmail({ gmail, sheet: summarySheet });
    });
  } else {
    sendToSlack('summary-sheetが見つからなかったワン🐶');
  }
};
