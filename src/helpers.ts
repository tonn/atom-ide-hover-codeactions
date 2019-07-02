export function NotEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

export class Defer<T> {
  readonly Promise$: Promise<T>;
  private _resolve?: (value?: T) => void;

  Resolve() { return this._resolve ? this._resolve() : true; }

  constructor() {
    this.Promise$ = new Promise<T>(resolve => this._resolve = resolve);
  }
}

export function IsPromise(obj: any): obj is Promise<any> {
  return obj && 'then' in obj;
}
