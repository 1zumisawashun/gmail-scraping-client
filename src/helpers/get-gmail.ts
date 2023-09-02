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
export function getMail() {
  const query = 'subject:(お問い合わせ)';
  const Threads = GmailApp.search(query, 0, 10);
  const MessagesForThreads = GmailApp.getMessagesForThreads(Threads);

  console.log('●検索クエリー: ' + query);
  console.log('●対象スレッド数: ' + Threads.length);

  for (const Thread of MessagesForThreads) {
    console.log('○スレッド内のメール数:' + Thread.length);
    for (const Message of Thread) {
      const strDate = Utilities.formatDate(
        Message.getDate(),
        'JST',
        'yyyy/MM/dd HH:mm:ss'
      );
      const Subject = Message.getSubject();
      const PlainBody = Message.getPlainBody();
      console.log('受信日時:' + strDate);
      console.log('メール件名:' + Subject);
      console.log('メール本文:' + PlainBody);
      console.log('==================');
    }
  }
  return '実行完了';
}
