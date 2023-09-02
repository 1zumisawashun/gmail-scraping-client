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
import { formatDateFullYearMonthDateTime } from '../../../functions/helpers/format-date';

export function getMail() {
  // 現在時刻から1時間以内のものを全て取得する
  // 件名は関係なし
  // 取得したものをメールアドレスで分類する
  // メールアドレスをファイル名にする
  // 時間でタブに分ける
  const threads = searchGmail();
  // const res = threads.map(thread => {
  //   return thread.getMessages().map(message => {
  //     console.log(message.getFrom());
  //     return message.getFrom();
  //   });
  // });

  // console.log(JSON.parse(JSON.stringify(res)), 'myThreads1');
  const messagesForThreads = GmailApp.getMessagesForThreads(threads);

  console.log('●対象スレッド数: ' + threads.length);

  for (const thread of messagesForThreads) {
    console.log('○スレッド内のメール数:' + thread.length);
    for (const message of thread) {
      const date = message.getDate();
      const strDate = formatDateFullYearMonthDateTime({ date });
      const Subject = message.getSubject();
      const PlainBody = message.getPlainBody();

      console.log('受信日時:' + strDate);
      console.log('メール件名:' + Subject);
      console.log('メール本文:' + PlainBody);
    }
  }
}
