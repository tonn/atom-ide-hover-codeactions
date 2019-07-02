import etch from 'etch';
import { CodeAction } from 'atom-ide';

import { EtchComponentBase } from './EtchComponentBase';

export interface CodeActionViewProperties {
  Action: CodeAction;
  Index: number;
}

export class CodeActionView extends EtchComponentBase<CodeActionViewProperties> {
  private _title: string | undefined;

  constructor(props: CodeActionViewProperties, children: etch.EtchComponent<any>[] = []) {
    super(props, children);

    this.prepare$();
  }

  async prepare$() {
    this._title = await this.properties.Action.getTitle();

    etch.update(this);
  }

  render(): JSX.Element {
    if (this._title) {
      return (
        <div className={`CodeActionView`} onclick={this.properties.Action.apply}>
          {this.properties.Index + 1}. {this._title}
        </div>
      );
    } else {
      return <div />;
    }
  }
}
