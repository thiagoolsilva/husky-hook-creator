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

import { exec, exit } from 'shelljs';

(() => {
  const regexBranchName = /HHC-\d+$/gm;
  const getBranchNameScript = 'git rev-parse --abbrev-ref HEAD';
  const { stdout: branchName } = exec(getBranchNameScript, {
    silent: true,
  });
  const checkBranchResult = branchName.match(regexBranchName);

  // check branch name
  if (!checkBranchResult) {
    // eslint-disable-next-line no-console
    console.log('\x1b[33m ---> The branch name does not match the pattern HHC-\\d+$. \x1b[0m');
    exit(1);
  }
})();
