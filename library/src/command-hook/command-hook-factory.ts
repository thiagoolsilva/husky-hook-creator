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

import { CommandHookInterface } from "./command-hook.interface";
import { CommandHookOutput } from "./model/command-hook-output";

/**
 * Builder used to create command hook
 */
export class CommandHookFactory {
  /**
   * Create Command hooks
   * @param gitHook gitHook. Ex: pre-commit, prepare-commit-msg etc. For more details access the link https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
   * @param command command used on hook
   * @returns instance of Command Hook Output
   */
  public static createHookCommand(
    gitHook: string,
    command: string
  ): CommandHookInterface {
    return {
      configure(): CommandHookOutput {
        return {
          gitHook,
          command,
        };
      },
    };
  }
}
