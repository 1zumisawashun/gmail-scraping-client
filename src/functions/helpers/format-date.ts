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

// NOTE:kanisan-clientから引っ張ってきた。必要なければ削除する
export const getFormattedDate = (params: any) => {
  const eventTs = params.event.event_ts;
  const now = new Date(eventTs * 1000);

  const hours = `0${now.getHours()}`.slice(-2);
  const minutes = `0${now.getMinutes()}`.slice(-2);
  const time = `${hours}:${minutes}`;

  const dateFullYearMonth = Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy/MM');
  const dateFullYearMonthDay = Utilities.formatDate(
    now,
    'Asia/Tokyo',
    'yyyy/MM/dd'
  );

  const dateFullYearMonthDayTime = `${dateFullYearMonthDay} ${time}`;

  return {
    dateFullYearMonth,
    dateFullYearMonthDay,
    dateFullYearMonthDayTime,
    time,
  };
};
