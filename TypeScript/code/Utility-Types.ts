// Utility Types

/**
 * Awaited<Type>
 */
type ImplementAwaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F): any }
  ? F extends (values: infer V, ...args: any) => any
    ? Awaited<T>
    : never
  : T;

type A = ImplementAwaited<Promise<string>>;
// type A = string

type B = ImplementAwaited<Promise<Promise<number>>>;
// type B = number

type C = ImplementAwaited<boolean | Promise<number>>;
// type C = number | boolean

/**
 * Partial<Type>
 */
type ImplementPartial<T> = T extends object
  ? {
      [P in keyof T]?: T[P];
    }
  : never;
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: ImplementPartial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "Clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});

/**
 * Required<Type>
 */
type ImplementRequired<T> = T extends object
  ? { [P in keyof T]-?: T[P] }
  : never;

interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 };

type TObj2 = ImplementRequired<Props>;
// type TObj2 = {
//     a: number;
//     b: string;
// }

/**
 * Readonly<Type>
 */
type implementReadonly<T> = { readonly [P in keyof T]: T[P] };
// T extends object
//     ? { readonly [P in keyof T]: T[P] }
//     : never

interface TTest {
  title: string;
}

type TTest2 = implementReadonly<TTest>;
// type TTest2 = {
//     readonly title: string;
// }

/**
 * Record<Keys, Type>
 */
type ImplementRecord<K extends keyof any, T> = {
  [P in K]: T;
};

interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: ImplementRecord<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

/**
 * Pick<Type, Keys>
 */
type ImplementPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface TTest3 {
  title: string;
  description: string;
  completed: boolean;
}

type Test3Preview = ImplementPick<TTest3, "title" | "completed">;

const test3: Test3Preview = {
  title: "Clean room",
  completed: false,
};

/**
 * Exclude<UnionType, ExcludedMembers>
 */
type ImplementExclude<T, U> = T extends U ? never : T;

type ExcTest1 = ImplementExclude<"a" | "b" | "c", "a">;

type ExcTest2 = Exclude<string | number | (() => void), () => void>;

/**
 * Omit<Type, Keys>
 */
type ImplementOmit<T, K extends keyof any> = ImplementPick<
  T,
  ImplementExclude<keyof T, K>
>;
interface TTest5 {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type Test5Preview = ImplementOmit<TTest5, "description">;

const test5: Test5Preview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};

type T0 = Parameters<() => string>;
// type T0 = []

type T1 = Parameters<(s: string) => void>;
// type T1 = [s: string]

type T2 = Parameters<<T>(args: T) => T>;
// type T2 = [args: unknown]

declare function f1(args: { a: string; b: string }): void;
type T3 = Parameters<typeof f1>;
// type T3 = [args: {
//     a: string;
//     b: string;
// }]
