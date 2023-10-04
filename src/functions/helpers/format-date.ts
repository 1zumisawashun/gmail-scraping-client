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
import { GasDate } from '@/functions/types/GoogleAppsScript';

export const formatDateFullYearMonthDateTime = ({ date }: { date: GasDate }) =>
  Utilities.formatDate(date, 'JST', 'yyyy/MM/dd HH:mm:ss');

export const formatDateFullYearMonthDate = ({ date }: { date: GasDate }) =>
  Utilities.formatDate(date, 'JST', 'yyyy/MM/dd');

export const formatDateTime = ({ date }: { date: GasDate }) =>
  Utilities.formatDate(date, 'JST', 'HH:mm:ss');

export const addDays = ({ date, num }: { date: Date; num: number }) => {
  const day = date.getDate();
  date.setDate(day + num);
  return Utilities.formatDate(date, 'JST', 'yyyy/MM/dd');
};

export const getOneWeekAgo = () => addDays({ date: new Date(), num: -7 });

export const getTwoDaysAgo = () => addDays({ date: new Date(), num: -2 });

export const getYesterday = () => addDays({ date: new Date(), num: -1 });

export const getToday = () => addDays({ date: new Date(), num: 0 });
