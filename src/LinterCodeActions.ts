import { TextEditor, Point } from 'atom';
import { UI, Linter, Message, MessagesPatch } from './linter';

import { Defer, IsPromise } from './helpers';

export class LinterCodeActions implements UI {
  name: string = 'atom-ide-hover-codeactions';

  private _lintMessages: Message[] = [];
  private _lintingPromises: { [filePath: string]: Defer<void> } = {};

  async GetLinterMessages$(textEditor: TextEditor, position: Point): Promise<Message[]> {
    const filePath = textEditor.getPath();

    if (filePath && filePath in this._lintingPromises) {
      await this._lintingPromises[filePath].Promise$;
    }

    const messages = this._lintMessages.filter(msg => msg.location.file === filePath && msg.location.position.containsPoint(position));

    await Promise.all(
      messages
      .filter(msg => IsPromise(msg.description))
      .map(async msg => {
        msg.description = await msg.description;
      })
    );

    return messages;
  }

  didBeginLinting(_: Linter, filePath?: string): void {
    if (filePath) {
      this._lintingPromises[filePath] = new Defer<void>();
    }
  }

  didFinishLinting(_: Linter, filePath?: string): void {
    if (filePath && filePath in this._lintingPromises) {
      this._lintingPromises[filePath].Resolve();
      delete this._lintingPromises[filePath];
    }
  }

  render(patch: MessagesPatch): void {
    this._lintMessages = patch.messages;
  }

  dispose(): void { }
}

export const LinterCodeActionsInstance = new LinterCodeActions();
