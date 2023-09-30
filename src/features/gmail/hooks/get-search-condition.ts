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
// 検索条件指定
export const searchCondition = [
  // 検索条件を配列で格納
  '（検索条件その1）',
  '（検索条件その2）',
].join('\u0020'); // 半角スペースで連結

// {Vue.js Nuxt.js React Next.js}でor条件になる

export const get15MinutesAgoSearchCondition = () => {
  const date = new Date(); // 現在時刻を取得
  const unixTime = date.getTime(); // UNIX TIMEに変換
  const now = Math.floor(unixTime / 1000); // ミリ秒を秒に変換
  const term = now - 60 * 15; // 現在時刻から15分前を取得する
  const termStr = term.toString(); // 検索期間を文字列に変換

  // NOTE:termの期間に、searchConditionの条件に合致するメール
  // const strTerms = 'after:' + termStr + ' ' + searchCondition;

  // NOTE:termの期間に合致するメール
  return `after:${termStr}`;
};
