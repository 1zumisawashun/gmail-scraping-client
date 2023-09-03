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
export function searchGmail() {
  // 受信日時指定
  const date = new Date(); // 現在時刻を取得
  const unixTime = date.getTime(); // UNIX TIMEに変換
  const now = Math.floor(unixTime / 1000); // ミリ秒を秒に変換
  const term = now - 60 * 60 * 48; // 現在時刻から2日前
  const termStr = term.toString(); // 検索期間を文字列に変換

  // const strTerms = 'after:' + termStr + ' ' + searchCondition; //検索条件：termの期間に、searchConditionの条件に合致するメール
  const strTerms = `after:${termStr}`;
  return GmailApp.search(strTerms, 0, 30); // 条件にマッチしたスレッドを取得
}
