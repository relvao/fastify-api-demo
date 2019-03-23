
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html

/**
 * Gets the types out of a promise, array or fn return type
 *
 * Usage:
 * ```
 * function MyFn(): Promise<MyType> {
 *    return promise.resolve(someData);
 * }
 * type NewType = Unpacked<ReturnType<typeof MyFn>>
 *
 * // NewType === MyType
 * ```
 */
export type Unpack<T> =
  T extends Array<infer U> ? U :
  T extends (...args: any[]) => infer Z ? Z :
  T extends Promise<infer W> ? W :
  T;

/**
 * Partial<T> only works on the 1st level of properties. If it's a complex object with nested properties
 * RecursivePartial should be used instead
 *
 * Usage:
 * ```
 * type PatchedUser = RecursivePartial<User>
 * ```
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
