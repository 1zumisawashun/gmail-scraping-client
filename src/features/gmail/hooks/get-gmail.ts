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
} from '@/functions/helpers';
import { angleBracketPattern, emailPattern } from '@/functions/constants';

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
  console.log(`●対象スレッド数: ${threads.length}`);

  const params = [];

  for (const thread of messagesForThreads) {
    console.log(`○スレッド内のメール数:${thread.length}`);
    for (const message of thread) {
      const date = message.getDate();
      const strDate = formatDateFullYearMonthDate({ date });
      const strDatetime = formatDateFullYearMonthDateTime({ date });
      const from = message.getFrom();
      const email = getGmailEmail({ from });
      const subject = message.getSubject();
      // const plainBody = message.getPlainBody();

      params.push({ date: strDate, datetime: strDatetime, email, subject });
    }
  }

  return params;
}
