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

import { CommandHookInterface } from '../command-hook/command-hook.interface';
import { ExecutorInterface } from '../executor/executor.interface';
import { Logger } from '../logger/logger';
import { HuskyRunnerInterface } from './husky-runner.interface';

export class HuskyRunner implements HuskyRunnerInterface {
  private installCommand?: string;

  private readonly preInstallCommands: string[] = [];

  private readonly commands: CommandHookInterface[] = [];

  public constructor(private executor: ExecutorInterface) {}

  /**
   * Add new pre-script command that gonna be execute before hook commands.
   * @param scriptCommand script command
   * @returns Current object reference
   */
  public addPreInstallCommand(scriptCommand: string): HuskyRunnerInterface {
    this.preInstallCommands.push(scriptCommand);

    return this;
  }

  /**
   * Install husky library
   * @param huskyInstallCommand if provided one it will be used to install husky. Otherside the husky folder gonna be installed at current path.
   * @returns Current object reference
   */
  public installHusky(huskyInstallCommand?: string): HuskyRunnerInterface {
    if (huskyInstallCommand) {
      this.installCommand = huskyInstallCommand;
    } else {
      this.installCommand = 'husky install';
    }

    return this;
  }

  /**
   * Add new husky command
   * @param command script command
   * @returns Current object reference
   */
  public addCommand(command: CommandHookInterface): HuskyRunnerInterface {
    this.commands.push(command);

    return this;
  }

  /**
   * Run all pending commands
   */
  public async runAllCommands(): Promise<void> {
    Logger.log('starting hook runner execution.');

    // execute pending scripts
    this.preInstallCommands.forEach(async (command: string) => {
      await this.executor.exec(`${command}`);
    });

    // install pending husky install command
    if (this.installCommand) await this.executor.exec(this.installCommand);

    if (this.commands.length) {
      // execute pending install husky script
      this.commands.forEach(async (item: CommandHookInterface) => {
        const { gitHook, command } = item.configure();
        await this.executor.exec(`husky add .husky/${gitHook} '${command}'`);
      });
    } else {
      Logger.log('There are no command available. Please provide one.');
    }

    Logger.log('finished hook runner execution.');
  }
}
