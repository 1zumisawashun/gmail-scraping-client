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

import { client as clientFunc } from '@/features/client';
import { database as databaseFunc } from '@/features/database';
import { skillFilter as skillFilterFunc } from '@/features/basic-filter';
import { integration as integrationFunc } from '@/features/integration';

function client() {
  clientFunc();
}
function database() {
  databaseFunc();
}
function skillFilter() {
  skillFilterFunc();
}
function onEdit(e: any) {
  console.log(e);
  integrationFunc();
}
