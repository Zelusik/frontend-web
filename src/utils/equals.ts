export const equals = (a: any, b: any) =>
  a.length === b.length && a.every((v: any, i: any) => v === b[i]);
