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
export const GMAIL_SCRAPING_CLIENT_FOLDER_ID =
  PropertiesService.getScriptProperties().getProperty(
    'GMAIL_SCRAPING_CLIENT_FOLDER_ID'
  ) as string;

export const GMAIL_SCRAPING_CLIENT_DATABASE_FOLDER_ID =
  PropertiesService.getScriptProperties().getProperty(
    'GMAIL_SCRAPING_CLIENT_DATABASE_FOLDER_ID'
  ) as string;

export const GMAIL_SCRAPING_CLIENT_INTEGRATION_SPREADSHEET_ID =
  PropertiesService.getScriptProperties().getProperty(
    'GMAIL_SCRAPING_CLIENT_INTEGRATION_SPREADSHEET_ID'
  ) as string;

export const SLACK_INCOMING_WEBHOOKS =
  PropertiesService.getScriptProperties().getProperty(
    'SLACK_INCOMING_WEBHOOKS'
  ) as string;
