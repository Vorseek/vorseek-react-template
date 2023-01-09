export const isFilledItemData = <T>(value: T): value is Exclude<T, null | '' | false> => Boolean(value);
