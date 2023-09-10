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
import { sendToSlack } from '@/functions/helpers';

export const deleteSpreadsheet = ({ filename }: { filename: string }) => {
  if (!GMAIL_SCRAPING_CLIENT_FOLDER_ID) {
    sendToSlack('エラーが発生したワン🐶');
    return undefined;
  }

  const folder = DriveApp.getFolderById(GMAIL_SCRAPING_CLIENT_FOLDER_ID);
  // NOTE:削除ではなく別のフォルダに移す仕様に変わるかもしれない
  const files = folder.getFilesByName('削除の練習');
  files.next().setTrashed(true);

  return undefined;
};
