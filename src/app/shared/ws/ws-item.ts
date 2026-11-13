/** One entry in a ws-list, ws-select, ws-tabs or ws-autocomplete. */
export interface WsItem<T = string> {
  name: string;
  value: T;
}

export function wsItems<T extends string>(...values: T[]): WsItem<T>[] {
  return values.map((value) => ({ name: value, value }));
}
