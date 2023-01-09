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

import { CommandHookFactory, HuskyRunnerFactory } from '../../src/index';

(async () => {
  const huskyHook = HuskyRunnerFactory.createShellJsRunner();
  await huskyHook
    .addPreInstallCommand('rm -rf .husky')
    .installHusky('cd .. && husky install library/.husky')
    .addCommand(CommandHookFactory.createHookCommand('commit-msg', 'cd library'))
    .addCommand(
      CommandHookFactory.createHookCommand(
        'commit-msg',
        './node_modules/.bin/commitlint --edit $1',
      ),
    )
    .addCommand(CommandHookFactory.createHookCommand('pre-commit', 'cd library'))
    .addCommand(CommandHookFactory.createHookCommand('pre-commit', 'yarn static-analysis:lint'))
    .addCommand(CommandHookFactory.createHookCommand('pre-commit', 'yarn static-analysis:format '))
    .addCommand(CommandHookFactory.createHookCommand('pre-push', 'cd library'))
    .addCommand(
      CommandHookFactory.createHookCommand('pre-push', 'yarn static-analysis:branch-name'),
    )
    .addCommand(
      CommandHookFactory.createHookCommand(
        'pre-push',
        './node_modules/.bin/pretty-quick --staged --bail',
      ),
    )
    .runAllCommands();
})();
