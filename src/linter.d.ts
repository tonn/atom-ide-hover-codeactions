import { DisplayMarker, TextEditor, Point, Decoration, Range } from 'atom';

// declare module 'linter' {
  export interface Linter { }

  export interface UI {
    name: string;
    didBeginLinting(linter: Linter, filePath?: string): void;
    didFinishLinting(linter: Linter, filePath?: string): void;
    render(patch: MessagesPatch): void;
    dispose(): void;
  }

  export interface Message {
    // Automatically added
    key: string;
    version: 2;
    linterName: string;

    // From providers
    location: {
      file: string,
      position: Range,
    };
    reference?: {
      file: string,
      position?: Point,
    };
    url?: string;
    icon?: string;
    excerpt: string;
    severity: 'error' | 'warning' | 'info';
    solutions?: Array<
      | {
          title?: string,
          position: Range,
          priority?: number,
          currentText?: string,
          replaceWith: string,
        }
      | {
          title?: string,
          priority?: number,
          position: Range,
          apply: () => any,
        }
    >;
    description?: string | (() => Promise<string> | string);
  }

  export interface MessagesPatch {
    added: Array<Message>;
    removed: Array<Message>;
    messages: Array<Message>;
  }
// }
