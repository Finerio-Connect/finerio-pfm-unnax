type Primitive = bigint | boolean | null | number | string | symbol | undefined;

type PlainObject = Record<string, Primitive>;

export default PlainObject;
