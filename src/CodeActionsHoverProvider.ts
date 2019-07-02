import { TextEditor, Point, Range } from 'atom';
import { HoverProvider } from './atom-ide-hover';
import { CodeActionProvider, DiagnosticType } from 'atom-ide';

import { CodeActionsView } from './CodeActionsView';
import { NotEmpty } from './helpers';
import { LinterCodeActionsInstance } from './LinterCodeActions';

export class CodeActionsHoverProvider implements HoverProvider {
  private _codeActionProviders: CodeActionProvider[] = [];

  AddCodeActionProvider(provider: CodeActionProvider) {
    this._codeActionProviders.push(provider);
  }

  get Name(): string {
    return 'CodeActions';
  }

  get Priority(): number {
    return 2;
  }

  async Get$(textEditor: TextEditor, position: Point): Promise<(HTMLElement | String)[]> {
    const range = new Range(position, new Point(position.row, position.column + 1));

    const linterMessages = await LinterCodeActionsInstance.GetLinterMessages$(textEditor, position);

    const diagnostics = linterMessages.map(message => ({
        filePath: message.location.file,
        providerName: message.linterName,
        range: message.location.position,
        text: message.excerpt,
        type: (message.severity[0].toUpperCase() + message.severity.slice(1)) as DiagnosticType
      }));

    const result = await Promise.all(this._codeActionProviders.map(provider => provider.getCodeActions(textEditor, range, diagnostics)));

    const actions = result.filter(NotEmpty).flatMap(i => i);

    if (actions && actions.length > 0) {
      const view = new CodeActionsView({ Actions: actions });

      return [view.element];
    }

    return [];
  }
}

export const CodeActionsHoverProviderInstance = new CodeActionsHoverProvider();
