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

/**
 * =============================================
 * Spreadsheet
 * =============================================
 */
export type Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
export type Sheet = GoogleAppsScript.Spreadsheet.Sheet;
export type Range = GoogleAppsScript.Spreadsheet.Range;

/**
 * =============================================
 * Base
 * =============================================
 */
export type GasDate = GoogleAppsScript.Base.Date;

/**
 * =============================================
 * Sheet
 * =============================================
 */
export type BatchUpdateSpreadsheetRequest =
  GoogleAppsScript.Sheets.Schema.BatchUpdateSpreadsheetRequest;
export type Request = GoogleAppsScript.Sheets.Schema.Request;
export type SetBasicFilterRequest =
  GoogleAppsScript.Sheets.Schema.SetBasicFilterRequest;
export type BasicFilter = GoogleAppsScript.Sheets.Schema.BasicFilter;

/**
 * =============================================
 * Gmail
 * =============================================
 */
export type GmailMessage = GoogleAppsScript.Gmail.GmailMessage;
