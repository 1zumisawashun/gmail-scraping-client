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
import { skills, workStyles } from '@/features/client/client.constant';

/**
 * @description 「期間」に部分一致する場合、該当箇所から改行するまでの一文を取得する
 * @description startDateとendDateで区切れればなお良い？chatGPT使った方が良いかも。
 */
const getPeriod = (body: string) => {
  return body.includes('期間') ? body.split('期間')[1].split('\r\n')[0] : '×';
};

const getWorkStyle = (body: string) => {
  return workStyles.includes(body) ? '⚪︎' : '×';
};

const getSkills = (body: string) => {
  return skills
    .map(skill => (body.includes(skill) ? skill : undefined))
    .filter(Boolean) as string[];
};

const getForeigner = (body: string) => {
  return '×';
};

const getOwner = (body: string) => {
  return '×';
};

export const formatClientGmailBody = ({ body }: { body: string }) => {
  const period = getPeriod(body);
  const workStyle = getWorkStyle(body);
  const foreigner = getForeigner(body);
  const owner = getOwner(body);

  // NOTE:具体的なスキルを絞り込む
  const bodySkills = getSkills(body);
  const hasBodySkill = bodySkills.length !== 0;
  const skill = hasBodySkill ? bodySkills.join('/') : '×';

  return { period, workStyle, foreigner, owner, skill };
};
