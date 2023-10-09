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
  formatDateTime,
  formatDateFullYearMonthDate,
  getToday,
} from '@/functions/helpers';
import { Gmail } from '@/features/client/client.type';
import { getGmailEmail } from '@/functions/helpers/gmail';
import { formatClientGmailBody } from '@/features/client/hooks';

/* eslint-disable */
export function getClientGmail() {
  const threads = GmailApp.search(`is:unread newer_than:1d `);
  const messagesForThreads = GmailApp.getMessagesForThreads(threads);

  const mails = [] as (Gmail | undefined)[];

  messagesForThreads.forEach(thread => {
    thread.forEach(message => {
      const date = message.getDate();
      const strDate = formatDateFullYearMonthDate({ date });
      const strTime = formatDateTime({ date });

      const from = message.getFrom();
      const email = getGmailEmail({ from });
      if ('noreply-apps-scripts-notifications@google.com'.includes(email))
        return undefined;

      const subject = message.getSubject();
      const attachments = message.getAttachments();
      const permalink = message.getThread().getPermalink();

      // NOTE:期間に部分一致する一行を取得する
      // let message = body.match(/：([\s\S]*)/);
      const body = message.getPlainBody();
      const { period, workStyle, foreigner, owner, skill } =
        formatClientGmailBody({ body });

      // NOTE:「要員情報」や「要員のご提案」・エクセルやpdfの添付があるメールは人・それ以外は案件
      const hasPerson = subject.includes('要員');
      const hasAttachments = attachments.length !== 0;

      message.markRead(); // 既読にする

      const category = () => {
        if (hasPerson) return '×';
        if (hasAttachments) return '×';
        return '⚪︎';
      };

      // NOTE:取得するのは今日の日付のメールのみで別日のスレッドは弾く
      const isTodayMail = strDate === getToday();

      const params = isTodayMail
        ? {
            date: strDate,
            time: strTime,
            email,
            subject,
            permalink,
            category: category(),
            skill,
            period,
            workStyle,
            foreigner,
            owner,
          }
        : undefined;

      mails.push(params);
    });
  });

  // FIXME:ダブっている要素はここで排除する（groupBy）

  return mails.filter(Boolean) as Gmail[];
}
