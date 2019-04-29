import { CompositeDisposable } from 'atom';
import { CodeActionProvider } from 'atom-ide';

import { HoverProvidersRegistry } from './atom-ide-hover';
import { CodeActionsProviderInstance } from './CodeActionsProvider';

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

    hoverProvidersRegistry.AddProvider(CodeActionsProviderInstance);
  }

  ConsumeCodeActionProvider(codeActionProvider: CodeActionProvider) {
    CodeActionsProviderInstance.CodeActionProvider = codeActionProvider;
  }
}

module.exports = new Main();
