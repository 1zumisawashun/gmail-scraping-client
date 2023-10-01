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
import { getOneWeekAgo, sendToSlack } from '@/functions/helpers';
import {
  GMAIL_SCRAPING_CLIENT_FOLDER_ID,
  GMAIL_SCRAPING_CLIENT_DB_FOLDER_ID,
} from '@/functions/constants';

export const database = () => {
  const oneWeekAgo = getOneWeekAgo();
  const folder = DriveApp.getFolderById(GMAIL_SCRAPING_CLIENT_FOLDER_ID);
  const db = DriveApp.getFolderById(GMAIL_SCRAPING_CLIENT_DB_FOLDER_ID);

  const files = folder.getFilesByName(oneWeekAgo);

  if (files.hasNext()) {
    const file = files.next();
    file.moveTo(db);
    sendToSlack(`古い${oneWeekAgo}のファイルをDBへ移動したワン🐶`);
  }
};
