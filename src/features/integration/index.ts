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
import { getTwoDaysAgo, getToday, getYesterday } from '@/functions/helpers';
import { sendToSlack } from '@/functions/helpers/slack';
import {
  getIntegrationSheet,
  resetIntegrationSheet,
  getSheetValuesByName,
  updateIntegrationSheetByValues,
} from './hooks';

export const integration = () => {
  const twoDaysAgo = getTwoDaysAgo();
  const yesterday = getYesterday();
  const today = getToday();

  const integrationSheet = getIntegrationSheet();

  if (!integrationSheet) {
    sendToSlack(`old-integration-sheetが見つからなかったワン🐶`);
    return;
  }

  resetIntegrationSheet({
    sheet: integrationSheet,
    name: `${twoDaysAgo}〜${today}`,
  });

  const twoDaysAgoSheetValues = getSheetValuesByName({ name: twoDaysAgo });
  const yesterdaySheetValues = getSheetValuesByName({ name: yesterday });

  if (twoDaysAgoSheetValues) {
    updateIntegrationSheetByValues({
      sheet: integrationSheet,
      values: twoDaysAgoSheetValues,
    });
  }

  if (yesterdaySheetValues) {
    updateIntegrationSheetByValues({
      sheet: integrationSheet,
      values: yesterdaySheetValues,
    });
  }

  sendToSlack(`新しく${twoDaysAgo}〜${today}のファイルを作成したワン🐶`);
};
