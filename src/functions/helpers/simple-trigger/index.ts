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
function onEdit(e: any) {
  // Set a comment on the edited cell to indicate when it was changed.
  const { range } = e;
  range.setNote(`Last modified: ${new Date()}`);
  // integrationFunc()
}

function editHandler(e: any) {
  // 編集前後の値を取得
  console.log('編集前: ', e.oldValue);
  console.log('編集後: ', e.value);

  // 編集されたセル範囲を取得
  const { range } = e;
  // セル範囲から、行と列の番号をそれぞれ取得
  console.log('行番号: ', range.getRow());
  console.log('列番号: ', range.getColumn());
}

function changeHandler(e: any) {
  // 変更の種類を取得
  console.log('変更の種類: ', e.changeType);
}
