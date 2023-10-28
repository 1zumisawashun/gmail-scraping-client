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
import { GmailMessage } from '@/functions/types/GoogleAppsScript';

/**
 * @description 「期間」に部分一致する場合、該当箇所から改行するまでの一文を取得する
 */
const getPeriod = ({ body }: { body: string }) => {
  const targets = ['【期間】:', '【期間】：', '期間：', '期間：'];

  let output = '';

  targets.forEach(target => {
    if (body.includes(target)) {
      const el = body.split(target)[1].split('\n')[0];
      output = el;
    }
  });

  return output ?? '-';
};

const getWorkStyle = ({ body }: { body: string }): string => {
  // 地方在住者不可
  return workStyles.includes(body) ? 'リモート可能' : 'リモート不可';
};

const getSkills = ({ body }: { body: string }): string => {
  const bodySkills = skills
    .map(skill => (body.includes(skill) ? skill : undefined))
    .filter(Boolean) as string[];

  const hasBodySkill = bodySkills.length !== 0;
  return hasBodySkill ? bodySkills.join('/') : '-';
};

const getForeigner = ({ body }: { body: string }): string => {
  // 外国人可否
  if ('外国人不可'.includes(body)) {
    return '外国人不可';
  }
  return '-';
};

const getOwner = ({ body }: { body: string }): string => {
  // 個人事業主
  // 商流：貴社まで（個人事業主も可）
  return '-';
};

export const formatClientGmailBody = ({
  message,
}: {
  message: GmailMessage;
}) => {
  const body = message.getPlainBody();

  const period = getPeriod({ body });
  const workStyle = getWorkStyle({ body });
  const foreigner = getForeigner({ body });
  const owner = getOwner({ body });
  const skill = getSkills({ body });

  return { period, workStyle, foreigner, owner, skill };
};
