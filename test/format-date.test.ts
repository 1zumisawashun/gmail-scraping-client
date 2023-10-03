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
import { addDays } from '@/functions/helpers';

describe('format-date', () => {
  const date = new Date('2020-8-20');

  it('Returns a one weeks ago string', () => {
    expect(addDays({ date, num: -7 })).toBe('2020/8/13');
  });
  it('Returns a today string', () => {
    expect(addDays({ date, num: 0 })).toBe('2020/8/20');
  });
  it('Returns a two days ago string', () => {
    expect(addDays({ date, num: -2 })).toBe('2020/8/18');
  });
  it('Returns a yesterday string', () => {
    expect(addDays({ date, num: -1 })).toBe('2020/8/19');
  });
});
