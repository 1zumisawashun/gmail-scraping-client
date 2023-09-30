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
import { angleBracketPattern, emailPattern } from '@/functions/constants';
import { skills } from '@/features/gmail/gmail.constant';

// FIXME:fromではなくemailを直接取得できるメソッドがあればそちらを使用する
const getGmailEmail = ({ from }: { from: string }) => {
  const angleBracketMatches = from.match(angleBracketPattern);

  if (angleBracketMatches) {
    const emailMatches = angleBracketMatches[0].match(emailPattern);
    if (emailMatches) {
      return emailMatches[0];
    }
    console.log('メールアドレスが見つかりませんでした。');
    return from;
  }
  console.log("'<...>' 形式のテキストが見つかりませんでした。");
  return from;
};

/* eslint-disable */
export function getGmail() {
  const threads = searchGmail();
  const messagesForThreads = GmailApp.getMessagesForThreads(threads);

  const mails = [];

  for (const thread of messagesForThreads) {
    for (const message of thread) {
      const date = message.getDate();
      const strDate = formatDateFullYearMonthDate({ date });
      const strDateTime = formatDateFullYearMonthDateTime({ date });
      const from = message.getFrom();
      const email = getGmailEmail({ from });
      const subject = message.getSubject();
      const body = message.getPlainBody();
      const attachments = message.getAttachments();
      // NOTE:「要員情報」や「要員のご提案」・エクセルやpdfの添付があるメールは人・それ以外は案件
      const hasPerson = subject.includes('要員');
      const hasAttachments = attachments.length !== 0;

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
            body,
          }
        : undefined;

      mails.push(params);
    }
  }
  return mails.filter(Boolean) as Gmail[];
}
