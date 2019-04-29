import { TextEditor, Point, Range } from 'atom';
import { HoverProvider } from './atom-ide-hover';
import { CodeActionProvider } from 'atom-ide';

import { CodeActionsView } from './CodeActionsView';

export class CodeActionsProvider implements HoverProvider {
  private _codeActionProvider: CodeActionProvider | undefined;

  set CodeActionProvider(value: CodeActionProvider) {
    this._codeActionProvider = value;
  }

  get Name(): string {
    return 'CodeActions';
  }

  get Priority(): number {
    return 2;
  }

  async Get$(textEditor: TextEditor, position: Point): Promise<(HTMLElement | String)[]> {
    if (this._codeActionProvider) {
      const actions = await this._codeActionProvider.getCodeActions(textEditor, new Range(position), []);

      if (actions && actions.length > 0) {
        const view = new CodeActionsView({ Actions: actions });

        return [view.element];
      }
    }

    return [];
  }
}

export const CodeActionsProviderInstance = new CodeActionsProvider();
