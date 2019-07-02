interface Array<T> {
  flatMap<TResult>(selector: (item: T) => TResult[]): TResult[];
}

Array.prototype.flatMap = function<T, TResult> (this: T[], selector: (item: T) => TResult[]): TResult[] {
  return this.reduce((result: TResult[], item: T) => result.concat(selector(item) || []), []);
};
