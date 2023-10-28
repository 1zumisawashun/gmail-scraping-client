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

import { Gmail } from '@/features/client/client.type';
import { getGmailEmail } from '@/functions/helpers/gmail';
import {
  formatClientGmailBody,
  formatClientGmailSubject,
  formatClientGmailDate,
} from '@/features/client/hooks';

/* eslint-disable */
export function getClientGmail() {
  const threads = GmailApp.search(`is:unread newer_than:1d `);
  const messagesForThreads = GmailApp.getMessagesForThreads(threads);

  const mails = [] as (Gmail | undefined)[];

  messagesForThreads.forEach(thread => {
    thread.forEach(message => {
      const subject = message.getSubject();
      const permalink = message.getThread().getPermalink();

      const email = getGmailEmail({ message });

      const { date, time, isTodayMail } = formatClientGmailDate({ message });
      const { period, workStyle, foreigner, owner, skill } =
        formatClientGmailBody({ message });
      const category = formatClientGmailSubject({ message });

      message.markRead(); // NOTE:既読にする

      if ('noreply-apps-scripts-notifications@google.com'.includes(email))
        return undefined;

      const params = isTodayMail
        ? {
            date,
            time,
            email,
            subject,
            permalink,
            category,
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
