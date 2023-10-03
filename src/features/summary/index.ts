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
  sendToSlack,
  getTwoDaysAgo,
  getToday,
  getYesterday,
} from '@/functions/helpers';
import {
  getSummarySheet,
  resetSummarySheet,
  getSheetValuesByName,
  updateSummarySheetByValues,
} from './hooks';

export const summary = () => {
  const twoDaysAgo = getTwoDaysAgo();
  const yesterday = getYesterday();
  const today = getToday();

  const summarySheet = getSummarySheet();

  resetSummarySheet({
    sheet: summarySheet,
    name: `${twoDaysAgo}〜${today}`,
  });

  const twoDaysAgoValues = getSheetValuesByName({ name: twoDaysAgo });
  const yesterdayValues = getSheetValuesByName({ name: yesterday });

  if (twoDaysAgoValues) {
    updateSummarySheetByValues({
      sheet: summarySheet,
      values: twoDaysAgoValues,
    });
  }
  if (yesterdayValues) {
    updateSummarySheetByValues({
      sheet: summarySheet,
      values: yesterdayValues,
    });
  }

  sendToSlack('サマリーを更新したワン🐶');
};
