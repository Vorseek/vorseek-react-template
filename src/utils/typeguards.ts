export const isFilledItem = <T>(value: T): value is Exclude<T, null | '' | false> => Boolean(value);
