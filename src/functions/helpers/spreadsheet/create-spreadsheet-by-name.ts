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
import { GMAIL_SCRAPING_CLIENT_FOLDER_ID } from '@/functions/constants';
import { sendToSlack } from '@/functions/helpers/slack';
import { getSpreadsheetById } from '@/functions/helpers/spreadsheet';
import { Spreadsheet } from '@/functions/types/GoogleAppsScript';

export const createSpreadsheetByName = ({
  name,
}: {
  name: string;
}): Spreadsheet | undefined => {
  const folder = DriveApp.getFolderById(GMAIL_SCRAPING_CLIENT_FOLDER_ID);
  const files = folder.getFilesByName('コピー（削除厳禁）');

  while (files.hasNext()) {
    const file = files.next();
    const copiedFile = file.makeCopy(name, folder);
    const id = copiedFile.getId();

    sendToSlack(`新しく${name}のファイルを作成したワン🐶`);

    return getSpreadsheetById({ id });
  }

  sendToSlack('エラーが発生したワン🐶');
  return undefined;
};
