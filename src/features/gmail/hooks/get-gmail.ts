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
import { searchGmail } from './search-gmail';
import {
  formatDateFullYearMonthDateTime,
  formatDateFullYearMonthDate,
  getToday,
} from '@/functions/helpers';
import { Gmail } from '@/features/gmail/gmail.type';
import { skills } from '@/features/gmail/gmail.constant';
import { getGmailEmail } from './get-gmail-email';

/* eslint-disable */
export function getGmail() {
  const threads = searchGmail();
  const messagesForThreads = GmailApp.getMessagesForThreads(threads);

  const mails = [] as (Gmail | undefined)[];

  messagesForThreads.forEach(thread => {
    thread.forEach(message => {
      const date = message.getDate();
      const strDate = formatDateFullYearMonthDate({ date });
      const strDateTime = formatDateFullYearMonthDateTime({ date });
      const from = message.getFrom();
      const email = getGmailEmail({ from });
      const subject = message.getSubject();
      const body = message.getPlainBody();
      const attachments = message.getAttachments();
      const permalink = message.getThread().getPermalink();

      // NOTE:「要員情報」や「要員のご提案」・エクセルやpdfの添付があるメールは人・それ以外は案件
      const hasPerson = subject.includes('要員');
      const hasAttachments = attachments.length !== 0;

      message.markRead(); // 既読にする

      const category = () => {
        if (hasPerson) {
          return '要員情報';
        }
        if (hasAttachments) {
          return '要員情報';
        }
        return '案件情報';
      };

      // NOTE:具体的なスキルを絞り込む
      const _skills = skills
        .map(skill => {
          if (body.includes(skill)) {
            return skill;
          } else {
            undefined;
          }
        })
        .filter(Boolean) as string[];

      const hasSkill = _skills.length !== 0;

      // NOTE:取得するのは今日の日付のメールのみで別日のスレッドは弾く
      const isTodayMail = strDate === getToday();

      const params = isTodayMail
        ? {
            date: strDate,
            dateTime: strDateTime,
            email,
            category: category(),
            skill: hasSkill ? _skills.join('/') : 'なし',
            subject,
            body: permalink,
          }
        : undefined;

      mails.push(params);
    });
  });

  return mails.filter(Boolean) as Gmail[];
}
