import { CompositeDisposable } from 'atom';
import { CodeActionProvider } from 'atom-ide';

import { UI } from './linter';

import { HoverProvidersRegistry } from './atom-ide-hover';
import { CodeActionsHoverProviderInstance } from './CodeActionsHoverProvider';
import { LinterCodeActionsInstance } from './LinterCodeActions';

class Main {
  config = {};
  subscriptions: CompositeDisposable | undefined;

  activate(): void {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable;
  }

  deactivate(): void {
    if (this.subscriptions) {
      this.subscriptions.dispose();
    }
  }

  ConsumeHoverProvidersRegistry(hoverProvidersRegistry: HoverProvidersRegistry) {
    console.log('ConsumeHoverProvidersRegistry');

    hoverProvidersRegistry.AddProvider(CodeActionsHoverProviderInstance);
  }

  ConsumeCodeActionProvider(codeActionProvider: CodeActionProvider) {
    CodeActionsHoverProviderInstance.AddCodeActionProvider(codeActionProvider);
  }

  ProviderLinterUI(): UI {
    return LinterCodeActionsInstance;
  }
}

module.exports = new Main();
