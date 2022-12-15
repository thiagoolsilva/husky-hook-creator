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

import { ExecutorInterface } from '../executor/executor.interface';
import { ShellJsExecutor } from '../executor/shelljs-executor';
import { HuskyRunner } from './husky-runner';

export class HuskyRunnerFactory {
  /**
   * Create default husky hook runner
   * @returns Default HuskyHookRunner
   */
  public static createShellJsRunner() {
    const shellJsExecutor = new ShellJsExecutor();
    const shellJsRunner = new HuskyRunner(shellJsExecutor);

    return shellJsRunner;
  }

  /**
   * Create Husky Hook Runner using provided executor
   * @param executor custom executor
   * @returns HuskyHookRunner
   */
  public static createCustomRunner(executor: ExecutorInterface) {
    return new HuskyRunner(executor);
  }
}
