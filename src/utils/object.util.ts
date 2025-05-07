type Primitive = string | number | boolean | null | undefined;

type FlatObject<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends Primitive
    ? { [P in `${Prefix}${K}`]: T[K] }
    : T[K] extends Array<any>
    ? { [P in `${Prefix}${K}`]: T[K] } // keep arrays unflattened
    : FlatObject<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

type Flatten<T> = {
  [K in keyof FlatObject<T>]: FlatObject<T>[K];
};

export const flattenObject = <T extends Record<string, any>>(
  obj: T
): Flatten<T> => {
  const result = {} as any;

  function recurse(curr: any, prefix = "") {
    for (const [key, value] of Object.entries(curr)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        !(value instanceof Date)
      ) {
        recurse(value, newKey);
      } else {
        result[newKey] = value;
      }
    }
  }

  recurse(obj);
  return result;
};
