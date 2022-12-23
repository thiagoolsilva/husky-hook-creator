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

import { CommandHookFactory, HuskyRunnerFactory } from '@husky-hook-creator/core';

// For more details about git hooks go to https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
const huskyHook = HuskyRunnerFactory.createShellJsRunner();
huskyHook
  .addPreInstallCommand('rm -rf .husky')
  .installHusky('cd .. && husky install sample/.husky')
  .addCommand(CommandHookFactory.createHookCommand('pre-commit', 'echo your shell script goes here.'))
  .addCommand(CommandHookFactory.createHookCommand('pre-push', 'echo your shell script goes here.'))
  .runAllCommands();
