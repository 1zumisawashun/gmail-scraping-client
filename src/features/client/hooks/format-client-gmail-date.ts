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
import { GmailMessage } from '@/functions/types/GoogleAppsScript';
import {
  formatDateTime,
  formatDateFullYearMonthDate,
  getToday,
} from '@/functions/helpers';

export const formatClientGmailDate = ({
  message,
}: {
  message: GmailMessage;
}) => {
  const date = formatDateFullYearMonthDate({ date: message.getDate() });
  const time = formatDateTime({ date: message.getDate() });

  // NOTE:取得するのは今日の日付のメールのみで別日のスレッドは弾く
  const isTodayMail = date === getToday();

  return { date, time, isTodayMail };
};
