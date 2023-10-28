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
import { GmailMessage } from '@/functions/types/GoogleAppsScript';

/**
 * @description メールタイトルの「要員情報」や「要員のご提案」や「〇〇人材」やエクセル・pdfの添付があるメールは要員情報・それ以外は案件情報として分類する
 * @description メール「本文」の要員情報のバリデーションは別途実施する
 */
export const formatClientGmailSubject = ({
  message,
}: {
  message: GmailMessage;
}) => {
  const subject = message.getSubject();
  const attachments = message.getAttachments();

  const hasYouin = subject.includes('要員');
  const hasZinzai = subject.includes('人材');
  const hasAttachments = attachments.length !== 0;

  if (hasYouin) return '要員情報';
  if (hasZinzai) return '要員情報';
  if (hasAttachments) return '要員情報';
  return '案件情報';
};
