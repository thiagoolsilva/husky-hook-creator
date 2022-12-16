/*
 * Copyright (c) 2022  Thiago Lopes da Silva
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { describe, expect } from '@jest/globals';
import { CommandHookFactory } from '../../../src/index';

describe('CommandHookFactory', () => {
  test('should create valid hook command', () => {
    const expectedCommand = { gitHook: 'pre-commit', command: 'echo hello from terminal' };
    const command = CommandHookFactory.createHookCommand('pre-commit', 'echo hello from terminal');
    const hookCommand = command.configure();

    expect(hookCommand).toEqual(expectedCommand);
  });
  test('should fail if provide empty githook parameter', () => {
    expect(() => CommandHookFactory.createHookCommand('', 'echo test')).toThrowError();
  });
  test('should fail if provide empty command parameter', () => {
    expect(() => CommandHookFactory.createHookCommand('pre-commit', '')).toThrowError();
  });
});
