import etch from 'etch';
import { CodeAction } from 'atom-ide';

import { EtchComponentBase } from './EtchComponentBase';
import { CodeActionView } from './CodeActionView';

export interface CodeActionsViewProperties {
  Actions: CodeAction[];
}

export class CodeActionsView extends EtchComponentBase<CodeActionsViewProperties> {
  render(): JSX.Element {
    return (
      <div>
        { this.properties.Actions.map(action => <CodeActionView Action={action} />) }
      </div>
    );
  }
}
