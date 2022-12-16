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

import { exec as shelljsExec } from 'shelljs';
import { ExecutorInterface } from './executor.interface';

/**
 * Executor all provided commands using shelljs library
 */
export class ShellJsExecutor implements ExecutorInterface {
  /**
   * Execute the command
   * @param command command
   */
  public exec(command: string): void {
    const exitCodeWithSuccess = 0;
    const execResult = shelljsExec(command);

    if (execResult.code !== exitCodeWithSuccess) {
      throw new Error(
        `Failed to execute the command [${command}]. The error code is [${execResult.code}] and error message [${execResult.stderr}]`,
      );
    }
  }
}
