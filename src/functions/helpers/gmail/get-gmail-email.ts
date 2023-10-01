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
import { angleBracketPattern, emailPattern } from '@/functions/constants';

export const getGmailEmail = ({ from }: { from: string }) => {
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
