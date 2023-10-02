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
  resetSummarySpreadsheet,
  getAllByName,
  updateByValues,
} from './hooks';

export const summary = () => {
  const twoDaysAgo = getTwoDaysAgo();
  const yesterday = getYesterday();
  const today = getToday();

  const summarySheet = getSummarySheet();

  resetSummarySpreadsheet({
    sheet: summarySheet,
    name: `${twoDaysAgo}〜${today}`,
  });

  // FIXME:一旦期待値のデータを出してみる
  // const twoDaysAgoValues = getAllByName({ name: twoDaysAgo });
  const twoDaysAgoValues: any[][] | undefined = undefined;
  const yesterdayValues = getAllByName({ name: yesterday });

  if (twoDaysAgoValues) {
    updateByValues({
      sheet: summarySheet,
      values: twoDaysAgoValues,
    });
  }
  if (yesterdayValues) {
    updateByValues({
      sheet: summarySheet,
      values: yesterdayValues,
    });
  }

  sendToSlack('サマリーを更新したワン🐶');
};
