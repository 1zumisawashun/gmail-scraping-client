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
export const formatDateFullYearMonthDateTime = ({
  date,
}: {
  date: GoogleAppsScript.Base.Date;
}) => Utilities.formatDate(date, 'JST', 'yyyy/MM/dd HH:mm:ss');

export const formatDateFullYearMonthDate = ({
  date,
}: {
  date: GoogleAppsScript.Base.Date;
}) => Utilities.formatDate(date, 'JST', 'yyyy/MM/dd');

export const getOneWeekAgo = () => {
  const date = new Date();
  const day = date.getDate();

  date.setDate(day - 7);

  const oneWeekAgo = Utilities.formatDate(date, 'JST', 'yyyy/MM/dd');
  return oneWeekAgo;
};

export const getTwoDaysAgo = () => {
  const date = new Date();
  const day = date.getDate();

  date.setDate(day - 2);

  const twoDaysAgo = Utilities.formatDate(date, 'JST', 'yyyy/MM/dd');
  return twoDaysAgo;
};

export const getYesterday = () => {
  const date = new Date();
  const day = date.getDate();

  date.setDate(day - 1);

  const twoDaysAgo = Utilities.formatDate(date, 'JST', 'yyyy/MM/dd');
  return twoDaysAgo;
};

export const getToday = () => {
  const date = new Date();
  const today = Utilities.formatDate(date, 'JST', 'yyyy/MM/dd');
  return today;
};
