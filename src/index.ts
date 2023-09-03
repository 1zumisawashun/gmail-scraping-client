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
import { hello, logger } from '@/functions/helpers';
import { getGmail } from '@/features/gmail/hooks';
import {
  getSpreadsheet,
  getSheet,
  updateSheet,
} from '@/features/spreadsheet/hooks';

const main = () => {
  hello();

  const gmails = getGmail();
  logger(gmails);

  gmails.forEach(gmail => {
    const { email, date } = gmail;
    const spreadsheet = getSpreadsheet({ email });
    const sheet = getSheet({ date, spreadsheet });
    updateSheet({ gmail, sheet });
  });
};

main();
