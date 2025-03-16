
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model spaces
 * 
 */
export type spaces = $Result.DefaultSelection<Prisma.$spacesPayload>
/**
 * Model spaces_activation_times
 * 
 */
export type spaces_activation_times = $Result.DefaultSelection<Prisma.$spaces_activation_timesPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.spaces`: Exposes CRUD operations for the **spaces** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Spaces
    * const spaces = await prisma.spaces.findMany()
    * ```
    */
  get spaces(): Prisma.spacesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.spaces_activation_times`: Exposes CRUD operations for the **spaces_activation_times** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Spaces_activation_times
    * const spaces_activation_times = await prisma.spaces_activation_times.findMany()
    * ```
    */
  get spaces_activation_times(): Prisma.spaces_activation_timesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.5.0
   * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    users: 'users',
    spaces: 'spaces',
    spaces_activation_times: 'spaces_activation_times'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "spaces" | "spaces_activation_times"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      spaces: {
        payload: Prisma.$spacesPayload<ExtArgs>
        fields: Prisma.spacesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.spacesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spacesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.spacesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spacesPayload>
          }
          findFirst: {
            args: Prisma.spacesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spacesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.spacesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spacesPayload>
          }
          findMany: {
            args: Prisma.spacesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spacesPayload>[]
          }
          create: {
            args: Prisma.spacesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spacesPayload>
          }
          createMany: {
            args: Prisma.spacesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.spacesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spacesPayload>[]
          }
          delete: {
            args: Prisma.spacesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spacesPayload>
          }
          update: {
            args: Prisma.spacesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spacesPayload>
          }
          deleteMany: {
            args: Prisma.spacesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.spacesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.spacesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spacesPayload>[]
          }
          upsert: {
            args: Prisma.spacesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spacesPayload>
          }
          aggregate: {
            args: Prisma.SpacesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpaces>
          }
          groupBy: {
            args: Prisma.spacesGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpacesGroupByOutputType>[]
          }
          count: {
            args: Prisma.spacesCountArgs<ExtArgs>
            result: $Utils.Optional<SpacesCountAggregateOutputType> | number
          }
        }
      }
      spaces_activation_times: {
        payload: Prisma.$spaces_activation_timesPayload<ExtArgs>
        fields: Prisma.spaces_activation_timesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.spaces_activation_timesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaces_activation_timesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.spaces_activation_timesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaces_activation_timesPayload>
          }
          findFirst: {
            args: Prisma.spaces_activation_timesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaces_activation_timesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.spaces_activation_timesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaces_activation_timesPayload>
          }
          findMany: {
            args: Prisma.spaces_activation_timesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaces_activation_timesPayload>[]
          }
          create: {
            args: Prisma.spaces_activation_timesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaces_activation_timesPayload>
          }
          createMany: {
            args: Prisma.spaces_activation_timesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.spaces_activation_timesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaces_activation_timesPayload>[]
          }
          delete: {
            args: Prisma.spaces_activation_timesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaces_activation_timesPayload>
          }
          update: {
            args: Prisma.spaces_activation_timesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaces_activation_timesPayload>
          }
          deleteMany: {
            args: Prisma.spaces_activation_timesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.spaces_activation_timesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.spaces_activation_timesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaces_activation_timesPayload>[]
          }
          upsert: {
            args: Prisma.spaces_activation_timesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spaces_activation_timesPayload>
          }
          aggregate: {
            args: Prisma.Spaces_activation_timesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpaces_activation_times>
          }
          groupBy: {
            args: Prisma.spaces_activation_timesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Spaces_activation_timesGroupByOutputType>[]
          }
          count: {
            args: Prisma.spaces_activation_timesCountArgs<ExtArgs>
            result: $Utils.Optional<Spaces_activation_timesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    users?: usersOmit
    spaces?: spacesOmit
    spaces_activation_times?: spaces_activation_timesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    spaces: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    spaces?: boolean | UsersCountOutputTypeCountSpacesArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountSpacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: spacesWhereInput
  }


  /**
   * Count Type SpacesCountOutputType
   */

  export type SpacesCountOutputType = {
    spaces_activation_times: number
  }

  export type SpacesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    spaces_activation_times?: boolean | SpacesCountOutputTypeCountSpaces_activation_timesArgs
  }

  // Custom InputTypes
  /**
   * SpacesCountOutputType without action
   */
  export type SpacesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpacesCountOutputType
     */
    select?: SpacesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SpacesCountOutputType without action
   */
  export type SpacesCountOutputTypeCountSpaces_activation_timesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: spaces_activation_timesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    email: number
    name: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    email: string
    name: string | null
    created_at: Date
    updated_at: Date
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    spaces?: boolean | users$spacesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "created_at" | "updated_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    spaces?: boolean | users$spacesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      spaces: Prisma.$spacesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      name: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    spaces<T extends users$spacesArgs<ExtArgs> = {}>(args?: Subset<T, users$spacesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spacesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */ 
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'Int'>
    readonly email: FieldRef<"users", 'String'>
    readonly name: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly updated_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.spaces
   */
  export type users$spacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces
     */
    select?: spacesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces
     */
    omit?: spacesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spacesInclude<ExtArgs> | null
    where?: spacesWhereInput
    orderBy?: spacesOrderByWithRelationInput | spacesOrderByWithRelationInput[]
    cursor?: spacesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpacesScalarFieldEnum | SpacesScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model spaces
   */

  export type AggregateSpaces = {
    _count: SpacesCountAggregateOutputType | null
    _avg: SpacesAvgAggregateOutputType | null
    _sum: SpacesSumAggregateOutputType | null
    _min: SpacesMinAggregateOutputType | null
    _max: SpacesMaxAggregateOutputType | null
  }

  export type SpacesAvgAggregateOutputType = {
    id: number | null
    users_id: number | null
  }

  export type SpacesSumAggregateOutputType = {
    id: number | null
    users_id: number | null
  }

  export type SpacesMinAggregateOutputType = {
    id: number | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
    subject: string | null
    is_active: boolean | null
    users_id: number | null
    is_deleted: boolean | null
    deleted_at: Date | null
    slug: string | null
  }

  export type SpacesMaxAggregateOutputType = {
    id: number | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
    subject: string | null
    is_active: boolean | null
    users_id: number | null
    is_deleted: boolean | null
    deleted_at: Date | null
    slug: string | null
  }

  export type SpacesCountAggregateOutputType = {
    id: number
    name: number
    created_at: number
    updated_at: number
    subject: number
    is_active: number
    users_id: number
    is_deleted: number
    deleted_at: number
    slug: number
    _all: number
  }


  export type SpacesAvgAggregateInputType = {
    id?: true
    users_id?: true
  }

  export type SpacesSumAggregateInputType = {
    id?: true
    users_id?: true
  }

  export type SpacesMinAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    subject?: true
    is_active?: true
    users_id?: true
    is_deleted?: true
    deleted_at?: true
    slug?: true
  }

  export type SpacesMaxAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    subject?: true
    is_active?: true
    users_id?: true
    is_deleted?: true
    deleted_at?: true
    slug?: true
  }

  export type SpacesCountAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    subject?: true
    is_active?: true
    users_id?: true
    is_deleted?: true
    deleted_at?: true
    slug?: true
    _all?: true
  }

  export type SpacesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spaces to aggregate.
     */
    where?: spacesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spaces to fetch.
     */
    orderBy?: spacesOrderByWithRelationInput | spacesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: spacesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned spaces
    **/
    _count?: true | SpacesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpacesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpacesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpacesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpacesMaxAggregateInputType
  }

  export type GetSpacesAggregateType<T extends SpacesAggregateArgs> = {
        [P in keyof T & keyof AggregateSpaces]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpaces[P]>
      : GetScalarType<T[P], AggregateSpaces[P]>
  }




  export type spacesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: spacesWhereInput
    orderBy?: spacesOrderByWithAggregationInput | spacesOrderByWithAggregationInput[]
    by: SpacesScalarFieldEnum[] | SpacesScalarFieldEnum
    having?: spacesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpacesCountAggregateInputType | true
    _avg?: SpacesAvgAggregateInputType
    _sum?: SpacesSumAggregateInputType
    _min?: SpacesMinAggregateInputType
    _max?: SpacesMaxAggregateInputType
  }

  export type SpacesGroupByOutputType = {
    id: number
    name: string
    created_at: Date
    updated_at: Date
    subject: string
    is_active: boolean
    users_id: number
    is_deleted: boolean
    deleted_at: Date | null
    slug: string
    _count: SpacesCountAggregateOutputType | null
    _avg: SpacesAvgAggregateOutputType | null
    _sum: SpacesSumAggregateOutputType | null
    _min: SpacesMinAggregateOutputType | null
    _max: SpacesMaxAggregateOutputType | null
  }

  type GetSpacesGroupByPayload<T extends spacesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpacesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpacesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpacesGroupByOutputType[P]>
            : GetScalarType<T[P], SpacesGroupByOutputType[P]>
        }
      >
    >


  export type spacesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    subject?: boolean
    is_active?: boolean
    users_id?: boolean
    is_deleted?: boolean
    deleted_at?: boolean
    slug?: boolean
    created_by?: boolean | usersDefaultArgs<ExtArgs>
    spaces_activation_times?: boolean | spaces$spaces_activation_timesArgs<ExtArgs>
    _count?: boolean | SpacesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spaces"]>

  export type spacesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    subject?: boolean
    is_active?: boolean
    users_id?: boolean
    is_deleted?: boolean
    deleted_at?: boolean
    slug?: boolean
    created_by?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spaces"]>

  export type spacesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    subject?: boolean
    is_active?: boolean
    users_id?: boolean
    is_deleted?: boolean
    deleted_at?: boolean
    slug?: boolean
    created_by?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spaces"]>

  export type spacesSelectScalar = {
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    subject?: boolean
    is_active?: boolean
    users_id?: boolean
    is_deleted?: boolean
    deleted_at?: boolean
    slug?: boolean
  }

  export type spacesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "created_at" | "updated_at" | "subject" | "is_active" | "users_id" | "is_deleted" | "deleted_at" | "slug", ExtArgs["result"]["spaces"]>
  export type spacesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    created_by?: boolean | usersDefaultArgs<ExtArgs>
    spaces_activation_times?: boolean | spaces$spaces_activation_timesArgs<ExtArgs>
    _count?: boolean | SpacesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type spacesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    created_by?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type spacesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    created_by?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $spacesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "spaces"
    objects: {
      created_by: Prisma.$usersPayload<ExtArgs>
      spaces_activation_times: Prisma.$spaces_activation_timesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      created_at: Date
      updated_at: Date
      subject: string
      is_active: boolean
      users_id: number
      is_deleted: boolean
      deleted_at: Date | null
      slug: string
    }, ExtArgs["result"]["spaces"]>
    composites: {}
  }

  type spacesGetPayload<S extends boolean | null | undefined | spacesDefaultArgs> = $Result.GetResult<Prisma.$spacesPayload, S>

  type spacesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<spacesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SpacesCountAggregateInputType | true
    }

  export interface spacesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['spaces'], meta: { name: 'spaces' } }
    /**
     * Find zero or one Spaces that matches the filter.
     * @param {spacesFindUniqueArgs} args - Arguments to find a Spaces
     * @example
     * // Get one Spaces
     * const spaces = await prisma.spaces.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends spacesFindUniqueArgs>(args: SelectSubset<T, spacesFindUniqueArgs<ExtArgs>>): Prisma__spacesClient<$Result.GetResult<Prisma.$spacesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Spaces that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {spacesFindUniqueOrThrowArgs} args - Arguments to find a Spaces
     * @example
     * // Get one Spaces
     * const spaces = await prisma.spaces.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends spacesFindUniqueOrThrowArgs>(args: SelectSubset<T, spacesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__spacesClient<$Result.GetResult<Prisma.$spacesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Spaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spacesFindFirstArgs} args - Arguments to find a Spaces
     * @example
     * // Get one Spaces
     * const spaces = await prisma.spaces.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends spacesFindFirstArgs>(args?: SelectSubset<T, spacesFindFirstArgs<ExtArgs>>): Prisma__spacesClient<$Result.GetResult<Prisma.$spacesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Spaces that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spacesFindFirstOrThrowArgs} args - Arguments to find a Spaces
     * @example
     * // Get one Spaces
     * const spaces = await prisma.spaces.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends spacesFindFirstOrThrowArgs>(args?: SelectSubset<T, spacesFindFirstOrThrowArgs<ExtArgs>>): Prisma__spacesClient<$Result.GetResult<Prisma.$spacesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Spaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spacesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Spaces
     * const spaces = await prisma.spaces.findMany()
     * 
     * // Get first 10 Spaces
     * const spaces = await prisma.spaces.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spacesWithIdOnly = await prisma.spaces.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends spacesFindManyArgs>(args?: SelectSubset<T, spacesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spacesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Spaces.
     * @param {spacesCreateArgs} args - Arguments to create a Spaces.
     * @example
     * // Create one Spaces
     * const Spaces = await prisma.spaces.create({
     *   data: {
     *     // ... data to create a Spaces
     *   }
     * })
     * 
     */
    create<T extends spacesCreateArgs>(args: SelectSubset<T, spacesCreateArgs<ExtArgs>>): Prisma__spacesClient<$Result.GetResult<Prisma.$spacesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Spaces.
     * @param {spacesCreateManyArgs} args - Arguments to create many Spaces.
     * @example
     * // Create many Spaces
     * const spaces = await prisma.spaces.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends spacesCreateManyArgs>(args?: SelectSubset<T, spacesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Spaces and returns the data saved in the database.
     * @param {spacesCreateManyAndReturnArgs} args - Arguments to create many Spaces.
     * @example
     * // Create many Spaces
     * const spaces = await prisma.spaces.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Spaces and only return the `id`
     * const spacesWithIdOnly = await prisma.spaces.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends spacesCreateManyAndReturnArgs>(args?: SelectSubset<T, spacesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spacesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Spaces.
     * @param {spacesDeleteArgs} args - Arguments to delete one Spaces.
     * @example
     * // Delete one Spaces
     * const Spaces = await prisma.spaces.delete({
     *   where: {
     *     // ... filter to delete one Spaces
     *   }
     * })
     * 
     */
    delete<T extends spacesDeleteArgs>(args: SelectSubset<T, spacesDeleteArgs<ExtArgs>>): Prisma__spacesClient<$Result.GetResult<Prisma.$spacesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Spaces.
     * @param {spacesUpdateArgs} args - Arguments to update one Spaces.
     * @example
     * // Update one Spaces
     * const spaces = await prisma.spaces.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends spacesUpdateArgs>(args: SelectSubset<T, spacesUpdateArgs<ExtArgs>>): Prisma__spacesClient<$Result.GetResult<Prisma.$spacesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Spaces.
     * @param {spacesDeleteManyArgs} args - Arguments to filter Spaces to delete.
     * @example
     * // Delete a few Spaces
     * const { count } = await prisma.spaces.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends spacesDeleteManyArgs>(args?: SelectSubset<T, spacesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spacesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Spaces
     * const spaces = await prisma.spaces.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends spacesUpdateManyArgs>(args: SelectSubset<T, spacesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spaces and returns the data updated in the database.
     * @param {spacesUpdateManyAndReturnArgs} args - Arguments to update many Spaces.
     * @example
     * // Update many Spaces
     * const spaces = await prisma.spaces.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Spaces and only return the `id`
     * const spacesWithIdOnly = await prisma.spaces.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends spacesUpdateManyAndReturnArgs>(args: SelectSubset<T, spacesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spacesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Spaces.
     * @param {spacesUpsertArgs} args - Arguments to update or create a Spaces.
     * @example
     * // Update or create a Spaces
     * const spaces = await prisma.spaces.upsert({
     *   create: {
     *     // ... data to create a Spaces
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Spaces we want to update
     *   }
     * })
     */
    upsert<T extends spacesUpsertArgs>(args: SelectSubset<T, spacesUpsertArgs<ExtArgs>>): Prisma__spacesClient<$Result.GetResult<Prisma.$spacesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Spaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spacesCountArgs} args - Arguments to filter Spaces to count.
     * @example
     * // Count the number of Spaces
     * const count = await prisma.spaces.count({
     *   where: {
     *     // ... the filter for the Spaces we want to count
     *   }
     * })
    **/
    count<T extends spacesCountArgs>(
      args?: Subset<T, spacesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpacesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Spaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpacesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpacesAggregateArgs>(args: Subset<T, SpacesAggregateArgs>): Prisma.PrismaPromise<GetSpacesAggregateType<T>>

    /**
     * Group by Spaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spacesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends spacesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: spacesGroupByArgs['orderBy'] }
        : { orderBy?: spacesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, spacesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpacesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the spaces model
   */
  readonly fields: spacesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for spaces.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__spacesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    created_by<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    spaces_activation_times<T extends spaces$spaces_activation_timesArgs<ExtArgs> = {}>(args?: Subset<T, spaces$spaces_activation_timesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spaces_activation_timesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the spaces model
   */ 
  interface spacesFieldRefs {
    readonly id: FieldRef<"spaces", 'Int'>
    readonly name: FieldRef<"spaces", 'String'>
    readonly created_at: FieldRef<"spaces", 'DateTime'>
    readonly updated_at: FieldRef<"spaces", 'DateTime'>
    readonly subject: FieldRef<"spaces", 'String'>
    readonly is_active: FieldRef<"spaces", 'Boolean'>
    readonly users_id: FieldRef<"spaces", 'Int'>
    readonly is_deleted: FieldRef<"spaces", 'Boolean'>
    readonly deleted_at: FieldRef<"spaces", 'DateTime'>
    readonly slug: FieldRef<"spaces", 'String'>
  }
    

  // Custom InputTypes
  /**
   * spaces findUnique
   */
  export type spacesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces
     */
    select?: spacesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces
     */
    omit?: spacesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spacesInclude<ExtArgs> | null
    /**
     * Filter, which spaces to fetch.
     */
    where: spacesWhereUniqueInput
  }

  /**
   * spaces findUniqueOrThrow
   */
  export type spacesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces
     */
    select?: spacesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces
     */
    omit?: spacesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spacesInclude<ExtArgs> | null
    /**
     * Filter, which spaces to fetch.
     */
    where: spacesWhereUniqueInput
  }

  /**
   * spaces findFirst
   */
  export type spacesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces
     */
    select?: spacesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces
     */
    omit?: spacesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spacesInclude<ExtArgs> | null
    /**
     * Filter, which spaces to fetch.
     */
    where?: spacesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spaces to fetch.
     */
    orderBy?: spacesOrderByWithRelationInput | spacesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spaces.
     */
    cursor?: spacesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spaces.
     */
    distinct?: SpacesScalarFieldEnum | SpacesScalarFieldEnum[]
  }

  /**
   * spaces findFirstOrThrow
   */
  export type spacesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces
     */
    select?: spacesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces
     */
    omit?: spacesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spacesInclude<ExtArgs> | null
    /**
     * Filter, which spaces to fetch.
     */
    where?: spacesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spaces to fetch.
     */
    orderBy?: spacesOrderByWithRelationInput | spacesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spaces.
     */
    cursor?: spacesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spaces.
     */
    distinct?: SpacesScalarFieldEnum | SpacesScalarFieldEnum[]
  }

  /**
   * spaces findMany
   */
  export type spacesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces
     */
    select?: spacesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces
     */
    omit?: spacesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spacesInclude<ExtArgs> | null
    /**
     * Filter, which spaces to fetch.
     */
    where?: spacesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spaces to fetch.
     */
    orderBy?: spacesOrderByWithRelationInput | spacesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing spaces.
     */
    cursor?: spacesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spaces.
     */
    skip?: number
    distinct?: SpacesScalarFieldEnum | SpacesScalarFieldEnum[]
  }

  /**
   * spaces create
   */
  export type spacesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces
     */
    select?: spacesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces
     */
    omit?: spacesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spacesInclude<ExtArgs> | null
    /**
     * The data needed to create a spaces.
     */
    data: XOR<spacesCreateInput, spacesUncheckedCreateInput>
  }

  /**
   * spaces createMany
   */
  export type spacesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many spaces.
     */
    data: spacesCreateManyInput | spacesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * spaces createManyAndReturn
   */
  export type spacesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces
     */
    select?: spacesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the spaces
     */
    omit?: spacesOmit<ExtArgs> | null
    /**
     * The data used to create many spaces.
     */
    data: spacesCreateManyInput | spacesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spacesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * spaces update
   */
  export type spacesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces
     */
    select?: spacesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces
     */
    omit?: spacesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spacesInclude<ExtArgs> | null
    /**
     * The data needed to update a spaces.
     */
    data: XOR<spacesUpdateInput, spacesUncheckedUpdateInput>
    /**
     * Choose, which spaces to update.
     */
    where: spacesWhereUniqueInput
  }

  /**
   * spaces updateMany
   */
  export type spacesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update spaces.
     */
    data: XOR<spacesUpdateManyMutationInput, spacesUncheckedUpdateManyInput>
    /**
     * Filter which spaces to update
     */
    where?: spacesWhereInput
    /**
     * Limit how many spaces to update.
     */
    limit?: number
  }

  /**
   * spaces updateManyAndReturn
   */
  export type spacesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces
     */
    select?: spacesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the spaces
     */
    omit?: spacesOmit<ExtArgs> | null
    /**
     * The data used to update spaces.
     */
    data: XOR<spacesUpdateManyMutationInput, spacesUncheckedUpdateManyInput>
    /**
     * Filter which spaces to update
     */
    where?: spacesWhereInput
    /**
     * Limit how many spaces to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spacesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * spaces upsert
   */
  export type spacesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces
     */
    select?: spacesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces
     */
    omit?: spacesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spacesInclude<ExtArgs> | null
    /**
     * The filter to search for the spaces to update in case it exists.
     */
    where: spacesWhereUniqueInput
    /**
     * In case the spaces found by the `where` argument doesn't exist, create a new spaces with this data.
     */
    create: XOR<spacesCreateInput, spacesUncheckedCreateInput>
    /**
     * In case the spaces was found with the provided `where` argument, update it with this data.
     */
    update: XOR<spacesUpdateInput, spacesUncheckedUpdateInput>
  }

  /**
   * spaces delete
   */
  export type spacesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces
     */
    select?: spacesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces
     */
    omit?: spacesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spacesInclude<ExtArgs> | null
    /**
     * Filter which spaces to delete.
     */
    where: spacesWhereUniqueInput
  }

  /**
   * spaces deleteMany
   */
  export type spacesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spaces to delete
     */
    where?: spacesWhereInput
    /**
     * Limit how many spaces to delete.
     */
    limit?: number
  }

  /**
   * spaces.spaces_activation_times
   */
  export type spaces$spaces_activation_timesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces_activation_times
     */
    select?: spaces_activation_timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces_activation_times
     */
    omit?: spaces_activation_timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaces_activation_timesInclude<ExtArgs> | null
    where?: spaces_activation_timesWhereInput
    orderBy?: spaces_activation_timesOrderByWithRelationInput | spaces_activation_timesOrderByWithRelationInput[]
    cursor?: spaces_activation_timesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Spaces_activation_timesScalarFieldEnum | Spaces_activation_timesScalarFieldEnum[]
  }

  /**
   * spaces without action
   */
  export type spacesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces
     */
    select?: spacesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces
     */
    omit?: spacesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spacesInclude<ExtArgs> | null
  }


  /**
   * Model spaces_activation_times
   */

  export type AggregateSpaces_activation_times = {
    _count: Spaces_activation_timesCountAggregateOutputType | null
    _avg: Spaces_activation_timesAvgAggregateOutputType | null
    _sum: Spaces_activation_timesSumAggregateOutputType | null
    _min: Spaces_activation_timesMinAggregateOutputType | null
    _max: Spaces_activation_timesMaxAggregateOutputType | null
  }

  export type Spaces_activation_timesAvgAggregateOutputType = {
    id: number | null
    space_id: number | null
  }

  export type Spaces_activation_timesSumAggregateOutputType = {
    id: number | null
    space_id: number | null
  }

  export type Spaces_activation_timesMinAggregateOutputType = {
    id: number | null
    space_id: number | null
    day_of_week: string | null
    start_time: string | null
  }

  export type Spaces_activation_timesMaxAggregateOutputType = {
    id: number | null
    space_id: number | null
    day_of_week: string | null
    start_time: string | null
  }

  export type Spaces_activation_timesCountAggregateOutputType = {
    id: number
    space_id: number
    day_of_week: number
    start_time: number
    _all: number
  }


  export type Spaces_activation_timesAvgAggregateInputType = {
    id?: true
    space_id?: true
  }

  export type Spaces_activation_timesSumAggregateInputType = {
    id?: true
    space_id?: true
  }

  export type Spaces_activation_timesMinAggregateInputType = {
    id?: true
    space_id?: true
    day_of_week?: true
    start_time?: true
  }

  export type Spaces_activation_timesMaxAggregateInputType = {
    id?: true
    space_id?: true
    day_of_week?: true
    start_time?: true
  }

  export type Spaces_activation_timesCountAggregateInputType = {
    id?: true
    space_id?: true
    day_of_week?: true
    start_time?: true
    _all?: true
  }

  export type Spaces_activation_timesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spaces_activation_times to aggregate.
     */
    where?: spaces_activation_timesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spaces_activation_times to fetch.
     */
    orderBy?: spaces_activation_timesOrderByWithRelationInput | spaces_activation_timesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: spaces_activation_timesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spaces_activation_times from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spaces_activation_times.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned spaces_activation_times
    **/
    _count?: true | Spaces_activation_timesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Spaces_activation_timesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Spaces_activation_timesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Spaces_activation_timesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Spaces_activation_timesMaxAggregateInputType
  }

  export type GetSpaces_activation_timesAggregateType<T extends Spaces_activation_timesAggregateArgs> = {
        [P in keyof T & keyof AggregateSpaces_activation_times]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpaces_activation_times[P]>
      : GetScalarType<T[P], AggregateSpaces_activation_times[P]>
  }




  export type spaces_activation_timesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: spaces_activation_timesWhereInput
    orderBy?: spaces_activation_timesOrderByWithAggregationInput | spaces_activation_timesOrderByWithAggregationInput[]
    by: Spaces_activation_timesScalarFieldEnum[] | Spaces_activation_timesScalarFieldEnum
    having?: spaces_activation_timesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Spaces_activation_timesCountAggregateInputType | true
    _avg?: Spaces_activation_timesAvgAggregateInputType
    _sum?: Spaces_activation_timesSumAggregateInputType
    _min?: Spaces_activation_timesMinAggregateInputType
    _max?: Spaces_activation_timesMaxAggregateInputType
  }

  export type Spaces_activation_timesGroupByOutputType = {
    id: number
    space_id: number
    day_of_week: string
    start_time: string
    _count: Spaces_activation_timesCountAggregateOutputType | null
    _avg: Spaces_activation_timesAvgAggregateOutputType | null
    _sum: Spaces_activation_timesSumAggregateOutputType | null
    _min: Spaces_activation_timesMinAggregateOutputType | null
    _max: Spaces_activation_timesMaxAggregateOutputType | null
  }

  type GetSpaces_activation_timesGroupByPayload<T extends spaces_activation_timesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Spaces_activation_timesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Spaces_activation_timesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Spaces_activation_timesGroupByOutputType[P]>
            : GetScalarType<T[P], Spaces_activation_timesGroupByOutputType[P]>
        }
      >
    >


  export type spaces_activation_timesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    space_id?: boolean
    day_of_week?: boolean
    start_time?: boolean
    space?: boolean | spacesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spaces_activation_times"]>

  export type spaces_activation_timesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    space_id?: boolean
    day_of_week?: boolean
    start_time?: boolean
    space?: boolean | spacesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spaces_activation_times"]>

  export type spaces_activation_timesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    space_id?: boolean
    day_of_week?: boolean
    start_time?: boolean
    space?: boolean | spacesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spaces_activation_times"]>

  export type spaces_activation_timesSelectScalar = {
    id?: boolean
    space_id?: boolean
    day_of_week?: boolean
    start_time?: boolean
  }

  export type spaces_activation_timesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "space_id" | "day_of_week" | "start_time", ExtArgs["result"]["spaces_activation_times"]>
  export type spaces_activation_timesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    space?: boolean | spacesDefaultArgs<ExtArgs>
  }
  export type spaces_activation_timesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    space?: boolean | spacesDefaultArgs<ExtArgs>
  }
  export type spaces_activation_timesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    space?: boolean | spacesDefaultArgs<ExtArgs>
  }

  export type $spaces_activation_timesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "spaces_activation_times"
    objects: {
      space: Prisma.$spacesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      space_id: number
      day_of_week: string
      start_time: string
    }, ExtArgs["result"]["spaces_activation_times"]>
    composites: {}
  }

  type spaces_activation_timesGetPayload<S extends boolean | null | undefined | spaces_activation_timesDefaultArgs> = $Result.GetResult<Prisma.$spaces_activation_timesPayload, S>

  type spaces_activation_timesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<spaces_activation_timesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Spaces_activation_timesCountAggregateInputType | true
    }

  export interface spaces_activation_timesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['spaces_activation_times'], meta: { name: 'spaces_activation_times' } }
    /**
     * Find zero or one Spaces_activation_times that matches the filter.
     * @param {spaces_activation_timesFindUniqueArgs} args - Arguments to find a Spaces_activation_times
     * @example
     * // Get one Spaces_activation_times
     * const spaces_activation_times = await prisma.spaces_activation_times.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends spaces_activation_timesFindUniqueArgs>(args: SelectSubset<T, spaces_activation_timesFindUniqueArgs<ExtArgs>>): Prisma__spaces_activation_timesClient<$Result.GetResult<Prisma.$spaces_activation_timesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Spaces_activation_times that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {spaces_activation_timesFindUniqueOrThrowArgs} args - Arguments to find a Spaces_activation_times
     * @example
     * // Get one Spaces_activation_times
     * const spaces_activation_times = await prisma.spaces_activation_times.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends spaces_activation_timesFindUniqueOrThrowArgs>(args: SelectSubset<T, spaces_activation_timesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__spaces_activation_timesClient<$Result.GetResult<Prisma.$spaces_activation_timesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Spaces_activation_times that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spaces_activation_timesFindFirstArgs} args - Arguments to find a Spaces_activation_times
     * @example
     * // Get one Spaces_activation_times
     * const spaces_activation_times = await prisma.spaces_activation_times.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends spaces_activation_timesFindFirstArgs>(args?: SelectSubset<T, spaces_activation_timesFindFirstArgs<ExtArgs>>): Prisma__spaces_activation_timesClient<$Result.GetResult<Prisma.$spaces_activation_timesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Spaces_activation_times that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spaces_activation_timesFindFirstOrThrowArgs} args - Arguments to find a Spaces_activation_times
     * @example
     * // Get one Spaces_activation_times
     * const spaces_activation_times = await prisma.spaces_activation_times.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends spaces_activation_timesFindFirstOrThrowArgs>(args?: SelectSubset<T, spaces_activation_timesFindFirstOrThrowArgs<ExtArgs>>): Prisma__spaces_activation_timesClient<$Result.GetResult<Prisma.$spaces_activation_timesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Spaces_activation_times that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spaces_activation_timesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Spaces_activation_times
     * const spaces_activation_times = await prisma.spaces_activation_times.findMany()
     * 
     * // Get first 10 Spaces_activation_times
     * const spaces_activation_times = await prisma.spaces_activation_times.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spaces_activation_timesWithIdOnly = await prisma.spaces_activation_times.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends spaces_activation_timesFindManyArgs>(args?: SelectSubset<T, spaces_activation_timesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spaces_activation_timesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Spaces_activation_times.
     * @param {spaces_activation_timesCreateArgs} args - Arguments to create a Spaces_activation_times.
     * @example
     * // Create one Spaces_activation_times
     * const Spaces_activation_times = await prisma.spaces_activation_times.create({
     *   data: {
     *     // ... data to create a Spaces_activation_times
     *   }
     * })
     * 
     */
    create<T extends spaces_activation_timesCreateArgs>(args: SelectSubset<T, spaces_activation_timesCreateArgs<ExtArgs>>): Prisma__spaces_activation_timesClient<$Result.GetResult<Prisma.$spaces_activation_timesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Spaces_activation_times.
     * @param {spaces_activation_timesCreateManyArgs} args - Arguments to create many Spaces_activation_times.
     * @example
     * // Create many Spaces_activation_times
     * const spaces_activation_times = await prisma.spaces_activation_times.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends spaces_activation_timesCreateManyArgs>(args?: SelectSubset<T, spaces_activation_timesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Spaces_activation_times and returns the data saved in the database.
     * @param {spaces_activation_timesCreateManyAndReturnArgs} args - Arguments to create many Spaces_activation_times.
     * @example
     * // Create many Spaces_activation_times
     * const spaces_activation_times = await prisma.spaces_activation_times.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Spaces_activation_times and only return the `id`
     * const spaces_activation_timesWithIdOnly = await prisma.spaces_activation_times.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends spaces_activation_timesCreateManyAndReturnArgs>(args?: SelectSubset<T, spaces_activation_timesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spaces_activation_timesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Spaces_activation_times.
     * @param {spaces_activation_timesDeleteArgs} args - Arguments to delete one Spaces_activation_times.
     * @example
     * // Delete one Spaces_activation_times
     * const Spaces_activation_times = await prisma.spaces_activation_times.delete({
     *   where: {
     *     // ... filter to delete one Spaces_activation_times
     *   }
     * })
     * 
     */
    delete<T extends spaces_activation_timesDeleteArgs>(args: SelectSubset<T, spaces_activation_timesDeleteArgs<ExtArgs>>): Prisma__spaces_activation_timesClient<$Result.GetResult<Prisma.$spaces_activation_timesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Spaces_activation_times.
     * @param {spaces_activation_timesUpdateArgs} args - Arguments to update one Spaces_activation_times.
     * @example
     * // Update one Spaces_activation_times
     * const spaces_activation_times = await prisma.spaces_activation_times.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends spaces_activation_timesUpdateArgs>(args: SelectSubset<T, spaces_activation_timesUpdateArgs<ExtArgs>>): Prisma__spaces_activation_timesClient<$Result.GetResult<Prisma.$spaces_activation_timesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Spaces_activation_times.
     * @param {spaces_activation_timesDeleteManyArgs} args - Arguments to filter Spaces_activation_times to delete.
     * @example
     * // Delete a few Spaces_activation_times
     * const { count } = await prisma.spaces_activation_times.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends spaces_activation_timesDeleteManyArgs>(args?: SelectSubset<T, spaces_activation_timesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spaces_activation_times.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spaces_activation_timesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Spaces_activation_times
     * const spaces_activation_times = await prisma.spaces_activation_times.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends spaces_activation_timesUpdateManyArgs>(args: SelectSubset<T, spaces_activation_timesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spaces_activation_times and returns the data updated in the database.
     * @param {spaces_activation_timesUpdateManyAndReturnArgs} args - Arguments to update many Spaces_activation_times.
     * @example
     * // Update many Spaces_activation_times
     * const spaces_activation_times = await prisma.spaces_activation_times.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Spaces_activation_times and only return the `id`
     * const spaces_activation_timesWithIdOnly = await prisma.spaces_activation_times.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends spaces_activation_timesUpdateManyAndReturnArgs>(args: SelectSubset<T, spaces_activation_timesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spaces_activation_timesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Spaces_activation_times.
     * @param {spaces_activation_timesUpsertArgs} args - Arguments to update or create a Spaces_activation_times.
     * @example
     * // Update or create a Spaces_activation_times
     * const spaces_activation_times = await prisma.spaces_activation_times.upsert({
     *   create: {
     *     // ... data to create a Spaces_activation_times
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Spaces_activation_times we want to update
     *   }
     * })
     */
    upsert<T extends spaces_activation_timesUpsertArgs>(args: SelectSubset<T, spaces_activation_timesUpsertArgs<ExtArgs>>): Prisma__spaces_activation_timesClient<$Result.GetResult<Prisma.$spaces_activation_timesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Spaces_activation_times.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spaces_activation_timesCountArgs} args - Arguments to filter Spaces_activation_times to count.
     * @example
     * // Count the number of Spaces_activation_times
     * const count = await prisma.spaces_activation_times.count({
     *   where: {
     *     // ... the filter for the Spaces_activation_times we want to count
     *   }
     * })
    **/
    count<T extends spaces_activation_timesCountArgs>(
      args?: Subset<T, spaces_activation_timesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Spaces_activation_timesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Spaces_activation_times.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Spaces_activation_timesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Spaces_activation_timesAggregateArgs>(args: Subset<T, Spaces_activation_timesAggregateArgs>): Prisma.PrismaPromise<GetSpaces_activation_timesAggregateType<T>>

    /**
     * Group by Spaces_activation_times.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spaces_activation_timesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends spaces_activation_timesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: spaces_activation_timesGroupByArgs['orderBy'] }
        : { orderBy?: spaces_activation_timesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, spaces_activation_timesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpaces_activation_timesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the spaces_activation_times model
   */
  readonly fields: spaces_activation_timesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for spaces_activation_times.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__spaces_activation_timesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    space<T extends spacesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, spacesDefaultArgs<ExtArgs>>): Prisma__spacesClient<$Result.GetResult<Prisma.$spacesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the spaces_activation_times model
   */ 
  interface spaces_activation_timesFieldRefs {
    readonly id: FieldRef<"spaces_activation_times", 'Int'>
    readonly space_id: FieldRef<"spaces_activation_times", 'Int'>
    readonly day_of_week: FieldRef<"spaces_activation_times", 'String'>
    readonly start_time: FieldRef<"spaces_activation_times", 'String'>
  }
    

  // Custom InputTypes
  /**
   * spaces_activation_times findUnique
   */
  export type spaces_activation_timesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces_activation_times
     */
    select?: spaces_activation_timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces_activation_times
     */
    omit?: spaces_activation_timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaces_activation_timesInclude<ExtArgs> | null
    /**
     * Filter, which spaces_activation_times to fetch.
     */
    where: spaces_activation_timesWhereUniqueInput
  }

  /**
   * spaces_activation_times findUniqueOrThrow
   */
  export type spaces_activation_timesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces_activation_times
     */
    select?: spaces_activation_timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces_activation_times
     */
    omit?: spaces_activation_timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaces_activation_timesInclude<ExtArgs> | null
    /**
     * Filter, which spaces_activation_times to fetch.
     */
    where: spaces_activation_timesWhereUniqueInput
  }

  /**
   * spaces_activation_times findFirst
   */
  export type spaces_activation_timesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces_activation_times
     */
    select?: spaces_activation_timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces_activation_times
     */
    omit?: spaces_activation_timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaces_activation_timesInclude<ExtArgs> | null
    /**
     * Filter, which spaces_activation_times to fetch.
     */
    where?: spaces_activation_timesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spaces_activation_times to fetch.
     */
    orderBy?: spaces_activation_timesOrderByWithRelationInput | spaces_activation_timesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spaces_activation_times.
     */
    cursor?: spaces_activation_timesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spaces_activation_times from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spaces_activation_times.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spaces_activation_times.
     */
    distinct?: Spaces_activation_timesScalarFieldEnum | Spaces_activation_timesScalarFieldEnum[]
  }

  /**
   * spaces_activation_times findFirstOrThrow
   */
  export type spaces_activation_timesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces_activation_times
     */
    select?: spaces_activation_timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces_activation_times
     */
    omit?: spaces_activation_timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaces_activation_timesInclude<ExtArgs> | null
    /**
     * Filter, which spaces_activation_times to fetch.
     */
    where?: spaces_activation_timesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spaces_activation_times to fetch.
     */
    orderBy?: spaces_activation_timesOrderByWithRelationInput | spaces_activation_timesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spaces_activation_times.
     */
    cursor?: spaces_activation_timesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spaces_activation_times from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spaces_activation_times.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spaces_activation_times.
     */
    distinct?: Spaces_activation_timesScalarFieldEnum | Spaces_activation_timesScalarFieldEnum[]
  }

  /**
   * spaces_activation_times findMany
   */
  export type spaces_activation_timesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces_activation_times
     */
    select?: spaces_activation_timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces_activation_times
     */
    omit?: spaces_activation_timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaces_activation_timesInclude<ExtArgs> | null
    /**
     * Filter, which spaces_activation_times to fetch.
     */
    where?: spaces_activation_timesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spaces_activation_times to fetch.
     */
    orderBy?: spaces_activation_timesOrderByWithRelationInput | spaces_activation_timesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing spaces_activation_times.
     */
    cursor?: spaces_activation_timesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spaces_activation_times from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spaces_activation_times.
     */
    skip?: number
    distinct?: Spaces_activation_timesScalarFieldEnum | Spaces_activation_timesScalarFieldEnum[]
  }

  /**
   * spaces_activation_times create
   */
  export type spaces_activation_timesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces_activation_times
     */
    select?: spaces_activation_timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces_activation_times
     */
    omit?: spaces_activation_timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaces_activation_timesInclude<ExtArgs> | null
    /**
     * The data needed to create a spaces_activation_times.
     */
    data: XOR<spaces_activation_timesCreateInput, spaces_activation_timesUncheckedCreateInput>
  }

  /**
   * spaces_activation_times createMany
   */
  export type spaces_activation_timesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many spaces_activation_times.
     */
    data: spaces_activation_timesCreateManyInput | spaces_activation_timesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * spaces_activation_times createManyAndReturn
   */
  export type spaces_activation_timesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces_activation_times
     */
    select?: spaces_activation_timesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the spaces_activation_times
     */
    omit?: spaces_activation_timesOmit<ExtArgs> | null
    /**
     * The data used to create many spaces_activation_times.
     */
    data: spaces_activation_timesCreateManyInput | spaces_activation_timesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaces_activation_timesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * spaces_activation_times update
   */
  export type spaces_activation_timesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces_activation_times
     */
    select?: spaces_activation_timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces_activation_times
     */
    omit?: spaces_activation_timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaces_activation_timesInclude<ExtArgs> | null
    /**
     * The data needed to update a spaces_activation_times.
     */
    data: XOR<spaces_activation_timesUpdateInput, spaces_activation_timesUncheckedUpdateInput>
    /**
     * Choose, which spaces_activation_times to update.
     */
    where: spaces_activation_timesWhereUniqueInput
  }

  /**
   * spaces_activation_times updateMany
   */
  export type spaces_activation_timesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update spaces_activation_times.
     */
    data: XOR<spaces_activation_timesUpdateManyMutationInput, spaces_activation_timesUncheckedUpdateManyInput>
    /**
     * Filter which spaces_activation_times to update
     */
    where?: spaces_activation_timesWhereInput
    /**
     * Limit how many spaces_activation_times to update.
     */
    limit?: number
  }

  /**
   * spaces_activation_times updateManyAndReturn
   */
  export type spaces_activation_timesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces_activation_times
     */
    select?: spaces_activation_timesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the spaces_activation_times
     */
    omit?: spaces_activation_timesOmit<ExtArgs> | null
    /**
     * The data used to update spaces_activation_times.
     */
    data: XOR<spaces_activation_timesUpdateManyMutationInput, spaces_activation_timesUncheckedUpdateManyInput>
    /**
     * Filter which spaces_activation_times to update
     */
    where?: spaces_activation_timesWhereInput
    /**
     * Limit how many spaces_activation_times to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaces_activation_timesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * spaces_activation_times upsert
   */
  export type spaces_activation_timesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces_activation_times
     */
    select?: spaces_activation_timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces_activation_times
     */
    omit?: spaces_activation_timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaces_activation_timesInclude<ExtArgs> | null
    /**
     * The filter to search for the spaces_activation_times to update in case it exists.
     */
    where: spaces_activation_timesWhereUniqueInput
    /**
     * In case the spaces_activation_times found by the `where` argument doesn't exist, create a new spaces_activation_times with this data.
     */
    create: XOR<spaces_activation_timesCreateInput, spaces_activation_timesUncheckedCreateInput>
    /**
     * In case the spaces_activation_times was found with the provided `where` argument, update it with this data.
     */
    update: XOR<spaces_activation_timesUpdateInput, spaces_activation_timesUncheckedUpdateInput>
  }

  /**
   * spaces_activation_times delete
   */
  export type spaces_activation_timesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces_activation_times
     */
    select?: spaces_activation_timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces_activation_times
     */
    omit?: spaces_activation_timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaces_activation_timesInclude<ExtArgs> | null
    /**
     * Filter which spaces_activation_times to delete.
     */
    where: spaces_activation_timesWhereUniqueInput
  }

  /**
   * spaces_activation_times deleteMany
   */
  export type spaces_activation_timesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spaces_activation_times to delete
     */
    where?: spaces_activation_timesWhereInput
    /**
     * Limit how many spaces_activation_times to delete.
     */
    limit?: number
  }

  /**
   * spaces_activation_times without action
   */
  export type spaces_activation_timesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spaces_activation_times
     */
    select?: spaces_activation_timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spaces_activation_times
     */
    omit?: spaces_activation_timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: spaces_activation_timesInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SpacesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at',
    subject: 'subject',
    is_active: 'is_active',
    users_id: 'users_id',
    is_deleted: 'is_deleted',
    deleted_at: 'deleted_at',
    slug: 'slug'
  };

  export type SpacesScalarFieldEnum = (typeof SpacesScalarFieldEnum)[keyof typeof SpacesScalarFieldEnum]


  export const Spaces_activation_timesScalarFieldEnum: {
    id: 'id',
    space_id: 'space_id',
    day_of_week: 'day_of_week',
    start_time: 'start_time'
  };

  export type Spaces_activation_timesScalarFieldEnum = (typeof Spaces_activation_timesScalarFieldEnum)[keyof typeof Spaces_activation_timesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: IntFilter<"users"> | number
    email?: StringFilter<"users"> | string
    name?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeFilter<"users"> | Date | string
    updated_at?: DateTimeFilter<"users"> | Date | string
    spaces?: SpacesListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    spaces?: spacesOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    name?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeFilter<"users"> | Date | string
    updated_at?: DateTimeFilter<"users"> | Date | string
    spaces?: SpacesListRelationFilter
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"users"> | number
    email?: StringWithAggregatesFilter<"users"> | string
    name?: StringNullableWithAggregatesFilter<"users"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
  }

  export type spacesWhereInput = {
    AND?: spacesWhereInput | spacesWhereInput[]
    OR?: spacesWhereInput[]
    NOT?: spacesWhereInput | spacesWhereInput[]
    id?: IntFilter<"spaces"> | number
    name?: StringFilter<"spaces"> | string
    created_at?: DateTimeFilter<"spaces"> | Date | string
    updated_at?: DateTimeFilter<"spaces"> | Date | string
    subject?: StringFilter<"spaces"> | string
    is_active?: BoolFilter<"spaces"> | boolean
    users_id?: IntFilter<"spaces"> | number
    is_deleted?: BoolFilter<"spaces"> | boolean
    deleted_at?: DateTimeNullableFilter<"spaces"> | Date | string | null
    slug?: StringFilter<"spaces"> | string
    created_by?: XOR<UsersScalarRelationFilter, usersWhereInput>
    spaces_activation_times?: Spaces_activation_timesListRelationFilter
  }

  export type spacesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    subject?: SortOrder
    is_active?: SortOrder
    users_id?: SortOrder
    is_deleted?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    slug?: SortOrder
    created_by?: usersOrderByWithRelationInput
    spaces_activation_times?: spaces_activation_timesOrderByRelationAggregateInput
  }

  export type spacesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: spacesWhereInput | spacesWhereInput[]
    OR?: spacesWhereInput[]
    NOT?: spacesWhereInput | spacesWhereInput[]
    name?: StringFilter<"spaces"> | string
    created_at?: DateTimeFilter<"spaces"> | Date | string
    updated_at?: DateTimeFilter<"spaces"> | Date | string
    subject?: StringFilter<"spaces"> | string
    is_active?: BoolFilter<"spaces"> | boolean
    users_id?: IntFilter<"spaces"> | number
    is_deleted?: BoolFilter<"spaces"> | boolean
    deleted_at?: DateTimeNullableFilter<"spaces"> | Date | string | null
    slug?: StringFilter<"spaces"> | string
    created_by?: XOR<UsersScalarRelationFilter, usersWhereInput>
    spaces_activation_times?: Spaces_activation_timesListRelationFilter
  }, "id">

  export type spacesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    subject?: SortOrder
    is_active?: SortOrder
    users_id?: SortOrder
    is_deleted?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    slug?: SortOrder
    _count?: spacesCountOrderByAggregateInput
    _avg?: spacesAvgOrderByAggregateInput
    _max?: spacesMaxOrderByAggregateInput
    _min?: spacesMinOrderByAggregateInput
    _sum?: spacesSumOrderByAggregateInput
  }

  export type spacesScalarWhereWithAggregatesInput = {
    AND?: spacesScalarWhereWithAggregatesInput | spacesScalarWhereWithAggregatesInput[]
    OR?: spacesScalarWhereWithAggregatesInput[]
    NOT?: spacesScalarWhereWithAggregatesInput | spacesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"spaces"> | number
    name?: StringWithAggregatesFilter<"spaces"> | string
    created_at?: DateTimeWithAggregatesFilter<"spaces"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"spaces"> | Date | string
    subject?: StringWithAggregatesFilter<"spaces"> | string
    is_active?: BoolWithAggregatesFilter<"spaces"> | boolean
    users_id?: IntWithAggregatesFilter<"spaces"> | number
    is_deleted?: BoolWithAggregatesFilter<"spaces"> | boolean
    deleted_at?: DateTimeNullableWithAggregatesFilter<"spaces"> | Date | string | null
    slug?: StringWithAggregatesFilter<"spaces"> | string
  }

  export type spaces_activation_timesWhereInput = {
    AND?: spaces_activation_timesWhereInput | spaces_activation_timesWhereInput[]
    OR?: spaces_activation_timesWhereInput[]
    NOT?: spaces_activation_timesWhereInput | spaces_activation_timesWhereInput[]
    id?: IntFilter<"spaces_activation_times"> | number
    space_id?: IntFilter<"spaces_activation_times"> | number
    day_of_week?: StringFilter<"spaces_activation_times"> | string
    start_time?: StringFilter<"spaces_activation_times"> | string
    space?: XOR<SpacesScalarRelationFilter, spacesWhereInput>
  }

  export type spaces_activation_timesOrderByWithRelationInput = {
    id?: SortOrder
    space_id?: SortOrder
    day_of_week?: SortOrder
    start_time?: SortOrder
    space?: spacesOrderByWithRelationInput
  }

  export type spaces_activation_timesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: spaces_activation_timesWhereInput | spaces_activation_timesWhereInput[]
    OR?: spaces_activation_timesWhereInput[]
    NOT?: spaces_activation_timesWhereInput | spaces_activation_timesWhereInput[]
    space_id?: IntFilter<"spaces_activation_times"> | number
    day_of_week?: StringFilter<"spaces_activation_times"> | string
    start_time?: StringFilter<"spaces_activation_times"> | string
    space?: XOR<SpacesScalarRelationFilter, spacesWhereInput>
  }, "id">

  export type spaces_activation_timesOrderByWithAggregationInput = {
    id?: SortOrder
    space_id?: SortOrder
    day_of_week?: SortOrder
    start_time?: SortOrder
    _count?: spaces_activation_timesCountOrderByAggregateInput
    _avg?: spaces_activation_timesAvgOrderByAggregateInput
    _max?: spaces_activation_timesMaxOrderByAggregateInput
    _min?: spaces_activation_timesMinOrderByAggregateInput
    _sum?: spaces_activation_timesSumOrderByAggregateInput
  }

  export type spaces_activation_timesScalarWhereWithAggregatesInput = {
    AND?: spaces_activation_timesScalarWhereWithAggregatesInput | spaces_activation_timesScalarWhereWithAggregatesInput[]
    OR?: spaces_activation_timesScalarWhereWithAggregatesInput[]
    NOT?: spaces_activation_timesScalarWhereWithAggregatesInput | spaces_activation_timesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"spaces_activation_times"> | number
    space_id?: IntWithAggregatesFilter<"spaces_activation_times"> | number
    day_of_week?: StringWithAggregatesFilter<"spaces_activation_times"> | string
    start_time?: StringWithAggregatesFilter<"spaces_activation_times"> | string
  }

  export type usersCreateInput = {
    email: string
    name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    spaces?: spacesCreateNestedManyWithoutCreated_byInput
  }

  export type usersUncheckedCreateInput = {
    id?: number
    email: string
    name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    spaces?: spacesUncheckedCreateNestedManyWithoutCreated_byInput
  }

  export type usersUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    spaces?: spacesUpdateManyWithoutCreated_byNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    spaces?: spacesUncheckedUpdateManyWithoutCreated_byNestedInput
  }

  export type usersCreateManyInput = {
    id?: number
    email: string
    name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type usersUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type spacesCreateInput = {
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    subject: string
    is_active: boolean
    is_deleted?: boolean
    deleted_at?: Date | string | null
    slug: string
    created_by: usersCreateNestedOneWithoutSpacesInput
    spaces_activation_times?: spaces_activation_timesCreateNestedManyWithoutSpaceInput
  }

  export type spacesUncheckedCreateInput = {
    id?: number
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    subject: string
    is_active: boolean
    users_id: number
    is_deleted?: boolean
    deleted_at?: Date | string | null
    slug: string
    spaces_activation_times?: spaces_activation_timesUncheckedCreateNestedManyWithoutSpaceInput
  }

  export type spacesUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slug?: StringFieldUpdateOperationsInput | string
    created_by?: usersUpdateOneRequiredWithoutSpacesNestedInput
    spaces_activation_times?: spaces_activation_timesUpdateManyWithoutSpaceNestedInput
  }

  export type spacesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    users_id?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slug?: StringFieldUpdateOperationsInput | string
    spaces_activation_times?: spaces_activation_timesUncheckedUpdateManyWithoutSpaceNestedInput
  }

  export type spacesCreateManyInput = {
    id?: number
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    subject: string
    is_active: boolean
    users_id: number
    is_deleted?: boolean
    deleted_at?: Date | string | null
    slug: string
  }

  export type spacesUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type spacesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    users_id?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type spaces_activation_timesCreateInput = {
    day_of_week: string
    start_time: string
    space: spacesCreateNestedOneWithoutSpaces_activation_timesInput
  }

  export type spaces_activation_timesUncheckedCreateInput = {
    id?: number
    space_id: number
    day_of_week: string
    start_time: string
  }

  export type spaces_activation_timesUpdateInput = {
    day_of_week?: StringFieldUpdateOperationsInput | string
    start_time?: StringFieldUpdateOperationsInput | string
    space?: spacesUpdateOneRequiredWithoutSpaces_activation_timesNestedInput
  }

  export type spaces_activation_timesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    space_id?: IntFieldUpdateOperationsInput | number
    day_of_week?: StringFieldUpdateOperationsInput | string
    start_time?: StringFieldUpdateOperationsInput | string
  }

  export type spaces_activation_timesCreateManyInput = {
    id?: number
    space_id: number
    day_of_week: string
    start_time: string
  }

  export type spaces_activation_timesUpdateManyMutationInput = {
    day_of_week?: StringFieldUpdateOperationsInput | string
    start_time?: StringFieldUpdateOperationsInput | string
  }

  export type spaces_activation_timesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    space_id?: IntFieldUpdateOperationsInput | number
    day_of_week?: StringFieldUpdateOperationsInput | string
    start_time?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SpacesListRelationFilter = {
    every?: spacesWhereInput
    some?: spacesWhereInput
    none?: spacesWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type spacesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type Spaces_activation_timesListRelationFilter = {
    every?: spaces_activation_timesWhereInput
    some?: spaces_activation_timesWhereInput
    none?: spaces_activation_timesWhereInput
  }

  export type spaces_activation_timesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type spacesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    subject?: SortOrder
    is_active?: SortOrder
    users_id?: SortOrder
    is_deleted?: SortOrder
    deleted_at?: SortOrder
    slug?: SortOrder
  }

  export type spacesAvgOrderByAggregateInput = {
    id?: SortOrder
    users_id?: SortOrder
  }

  export type spacesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    subject?: SortOrder
    is_active?: SortOrder
    users_id?: SortOrder
    is_deleted?: SortOrder
    deleted_at?: SortOrder
    slug?: SortOrder
  }

  export type spacesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    subject?: SortOrder
    is_active?: SortOrder
    users_id?: SortOrder
    is_deleted?: SortOrder
    deleted_at?: SortOrder
    slug?: SortOrder
  }

  export type spacesSumOrderByAggregateInput = {
    id?: SortOrder
    users_id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type SpacesScalarRelationFilter = {
    is?: spacesWhereInput
    isNot?: spacesWhereInput
  }

  export type spaces_activation_timesCountOrderByAggregateInput = {
    id?: SortOrder
    space_id?: SortOrder
    day_of_week?: SortOrder
    start_time?: SortOrder
  }

  export type spaces_activation_timesAvgOrderByAggregateInput = {
    id?: SortOrder
    space_id?: SortOrder
  }

  export type spaces_activation_timesMaxOrderByAggregateInput = {
    id?: SortOrder
    space_id?: SortOrder
    day_of_week?: SortOrder
    start_time?: SortOrder
  }

  export type spaces_activation_timesMinOrderByAggregateInput = {
    id?: SortOrder
    space_id?: SortOrder
    day_of_week?: SortOrder
    start_time?: SortOrder
  }

  export type spaces_activation_timesSumOrderByAggregateInput = {
    id?: SortOrder
    space_id?: SortOrder
  }

  export type spacesCreateNestedManyWithoutCreated_byInput = {
    create?: XOR<spacesCreateWithoutCreated_byInput, spacesUncheckedCreateWithoutCreated_byInput> | spacesCreateWithoutCreated_byInput[] | spacesUncheckedCreateWithoutCreated_byInput[]
    connectOrCreate?: spacesCreateOrConnectWithoutCreated_byInput | spacesCreateOrConnectWithoutCreated_byInput[]
    createMany?: spacesCreateManyCreated_byInputEnvelope
    connect?: spacesWhereUniqueInput | spacesWhereUniqueInput[]
  }

  export type spacesUncheckedCreateNestedManyWithoutCreated_byInput = {
    create?: XOR<spacesCreateWithoutCreated_byInput, spacesUncheckedCreateWithoutCreated_byInput> | spacesCreateWithoutCreated_byInput[] | spacesUncheckedCreateWithoutCreated_byInput[]
    connectOrCreate?: spacesCreateOrConnectWithoutCreated_byInput | spacesCreateOrConnectWithoutCreated_byInput[]
    createMany?: spacesCreateManyCreated_byInputEnvelope
    connect?: spacesWhereUniqueInput | spacesWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type spacesUpdateManyWithoutCreated_byNestedInput = {
    create?: XOR<spacesCreateWithoutCreated_byInput, spacesUncheckedCreateWithoutCreated_byInput> | spacesCreateWithoutCreated_byInput[] | spacesUncheckedCreateWithoutCreated_byInput[]
    connectOrCreate?: spacesCreateOrConnectWithoutCreated_byInput | spacesCreateOrConnectWithoutCreated_byInput[]
    upsert?: spacesUpsertWithWhereUniqueWithoutCreated_byInput | spacesUpsertWithWhereUniqueWithoutCreated_byInput[]
    createMany?: spacesCreateManyCreated_byInputEnvelope
    set?: spacesWhereUniqueInput | spacesWhereUniqueInput[]
    disconnect?: spacesWhereUniqueInput | spacesWhereUniqueInput[]
    delete?: spacesWhereUniqueInput | spacesWhereUniqueInput[]
    connect?: spacesWhereUniqueInput | spacesWhereUniqueInput[]
    update?: spacesUpdateWithWhereUniqueWithoutCreated_byInput | spacesUpdateWithWhereUniqueWithoutCreated_byInput[]
    updateMany?: spacesUpdateManyWithWhereWithoutCreated_byInput | spacesUpdateManyWithWhereWithoutCreated_byInput[]
    deleteMany?: spacesScalarWhereInput | spacesScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type spacesUncheckedUpdateManyWithoutCreated_byNestedInput = {
    create?: XOR<spacesCreateWithoutCreated_byInput, spacesUncheckedCreateWithoutCreated_byInput> | spacesCreateWithoutCreated_byInput[] | spacesUncheckedCreateWithoutCreated_byInput[]
    connectOrCreate?: spacesCreateOrConnectWithoutCreated_byInput | spacesCreateOrConnectWithoutCreated_byInput[]
    upsert?: spacesUpsertWithWhereUniqueWithoutCreated_byInput | spacesUpsertWithWhereUniqueWithoutCreated_byInput[]
    createMany?: spacesCreateManyCreated_byInputEnvelope
    set?: spacesWhereUniqueInput | spacesWhereUniqueInput[]
    disconnect?: spacesWhereUniqueInput | spacesWhereUniqueInput[]
    delete?: spacesWhereUniqueInput | spacesWhereUniqueInput[]
    connect?: spacesWhereUniqueInput | spacesWhereUniqueInput[]
    update?: spacesUpdateWithWhereUniqueWithoutCreated_byInput | spacesUpdateWithWhereUniqueWithoutCreated_byInput[]
    updateMany?: spacesUpdateManyWithWhereWithoutCreated_byInput | spacesUpdateManyWithWhereWithoutCreated_byInput[]
    deleteMany?: spacesScalarWhereInput | spacesScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutSpacesInput = {
    create?: XOR<usersCreateWithoutSpacesInput, usersUncheckedCreateWithoutSpacesInput>
    connectOrCreate?: usersCreateOrConnectWithoutSpacesInput
    connect?: usersWhereUniqueInput
  }

  export type spaces_activation_timesCreateNestedManyWithoutSpaceInput = {
    create?: XOR<spaces_activation_timesCreateWithoutSpaceInput, spaces_activation_timesUncheckedCreateWithoutSpaceInput> | spaces_activation_timesCreateWithoutSpaceInput[] | spaces_activation_timesUncheckedCreateWithoutSpaceInput[]
    connectOrCreate?: spaces_activation_timesCreateOrConnectWithoutSpaceInput | spaces_activation_timesCreateOrConnectWithoutSpaceInput[]
    createMany?: spaces_activation_timesCreateManySpaceInputEnvelope
    connect?: spaces_activation_timesWhereUniqueInput | spaces_activation_timesWhereUniqueInput[]
  }

  export type spaces_activation_timesUncheckedCreateNestedManyWithoutSpaceInput = {
    create?: XOR<spaces_activation_timesCreateWithoutSpaceInput, spaces_activation_timesUncheckedCreateWithoutSpaceInput> | spaces_activation_timesCreateWithoutSpaceInput[] | spaces_activation_timesUncheckedCreateWithoutSpaceInput[]
    connectOrCreate?: spaces_activation_timesCreateOrConnectWithoutSpaceInput | spaces_activation_timesCreateOrConnectWithoutSpaceInput[]
    createMany?: spaces_activation_timesCreateManySpaceInputEnvelope
    connect?: spaces_activation_timesWhereUniqueInput | spaces_activation_timesWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type usersUpdateOneRequiredWithoutSpacesNestedInput = {
    create?: XOR<usersCreateWithoutSpacesInput, usersUncheckedCreateWithoutSpacesInput>
    connectOrCreate?: usersCreateOrConnectWithoutSpacesInput
    upsert?: usersUpsertWithoutSpacesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutSpacesInput, usersUpdateWithoutSpacesInput>, usersUncheckedUpdateWithoutSpacesInput>
  }

  export type spaces_activation_timesUpdateManyWithoutSpaceNestedInput = {
    create?: XOR<spaces_activation_timesCreateWithoutSpaceInput, spaces_activation_timesUncheckedCreateWithoutSpaceInput> | spaces_activation_timesCreateWithoutSpaceInput[] | spaces_activation_timesUncheckedCreateWithoutSpaceInput[]
    connectOrCreate?: spaces_activation_timesCreateOrConnectWithoutSpaceInput | spaces_activation_timesCreateOrConnectWithoutSpaceInput[]
    upsert?: spaces_activation_timesUpsertWithWhereUniqueWithoutSpaceInput | spaces_activation_timesUpsertWithWhereUniqueWithoutSpaceInput[]
    createMany?: spaces_activation_timesCreateManySpaceInputEnvelope
    set?: spaces_activation_timesWhereUniqueInput | spaces_activation_timesWhereUniqueInput[]
    disconnect?: spaces_activation_timesWhereUniqueInput | spaces_activation_timesWhereUniqueInput[]
    delete?: spaces_activation_timesWhereUniqueInput | spaces_activation_timesWhereUniqueInput[]
    connect?: spaces_activation_timesWhereUniqueInput | spaces_activation_timesWhereUniqueInput[]
    update?: spaces_activation_timesUpdateWithWhereUniqueWithoutSpaceInput | spaces_activation_timesUpdateWithWhereUniqueWithoutSpaceInput[]
    updateMany?: spaces_activation_timesUpdateManyWithWhereWithoutSpaceInput | spaces_activation_timesUpdateManyWithWhereWithoutSpaceInput[]
    deleteMany?: spaces_activation_timesScalarWhereInput | spaces_activation_timesScalarWhereInput[]
  }

  export type spaces_activation_timesUncheckedUpdateManyWithoutSpaceNestedInput = {
    create?: XOR<spaces_activation_timesCreateWithoutSpaceInput, spaces_activation_timesUncheckedCreateWithoutSpaceInput> | spaces_activation_timesCreateWithoutSpaceInput[] | spaces_activation_timesUncheckedCreateWithoutSpaceInput[]
    connectOrCreate?: spaces_activation_timesCreateOrConnectWithoutSpaceInput | spaces_activation_timesCreateOrConnectWithoutSpaceInput[]
    upsert?: spaces_activation_timesUpsertWithWhereUniqueWithoutSpaceInput | spaces_activation_timesUpsertWithWhereUniqueWithoutSpaceInput[]
    createMany?: spaces_activation_timesCreateManySpaceInputEnvelope
    set?: spaces_activation_timesWhereUniqueInput | spaces_activation_timesWhereUniqueInput[]
    disconnect?: spaces_activation_timesWhereUniqueInput | spaces_activation_timesWhereUniqueInput[]
    delete?: spaces_activation_timesWhereUniqueInput | spaces_activation_timesWhereUniqueInput[]
    connect?: spaces_activation_timesWhereUniqueInput | spaces_activation_timesWhereUniqueInput[]
    update?: spaces_activation_timesUpdateWithWhereUniqueWithoutSpaceInput | spaces_activation_timesUpdateWithWhereUniqueWithoutSpaceInput[]
    updateMany?: spaces_activation_timesUpdateManyWithWhereWithoutSpaceInput | spaces_activation_timesUpdateManyWithWhereWithoutSpaceInput[]
    deleteMany?: spaces_activation_timesScalarWhereInput | spaces_activation_timesScalarWhereInput[]
  }

  export type spacesCreateNestedOneWithoutSpaces_activation_timesInput = {
    create?: XOR<spacesCreateWithoutSpaces_activation_timesInput, spacesUncheckedCreateWithoutSpaces_activation_timesInput>
    connectOrCreate?: spacesCreateOrConnectWithoutSpaces_activation_timesInput
    connect?: spacesWhereUniqueInput
  }

  export type spacesUpdateOneRequiredWithoutSpaces_activation_timesNestedInput = {
    create?: XOR<spacesCreateWithoutSpaces_activation_timesInput, spacesUncheckedCreateWithoutSpaces_activation_timesInput>
    connectOrCreate?: spacesCreateOrConnectWithoutSpaces_activation_timesInput
    upsert?: spacesUpsertWithoutSpaces_activation_timesInput
    connect?: spacesWhereUniqueInput
    update?: XOR<XOR<spacesUpdateToOneWithWhereWithoutSpaces_activation_timesInput, spacesUpdateWithoutSpaces_activation_timesInput>, spacesUncheckedUpdateWithoutSpaces_activation_timesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type spacesCreateWithoutCreated_byInput = {
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    subject: string
    is_active: boolean
    is_deleted?: boolean
    deleted_at?: Date | string | null
    slug: string
    spaces_activation_times?: spaces_activation_timesCreateNestedManyWithoutSpaceInput
  }

  export type spacesUncheckedCreateWithoutCreated_byInput = {
    id?: number
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    subject: string
    is_active: boolean
    is_deleted?: boolean
    deleted_at?: Date | string | null
    slug: string
    spaces_activation_times?: spaces_activation_timesUncheckedCreateNestedManyWithoutSpaceInput
  }

  export type spacesCreateOrConnectWithoutCreated_byInput = {
    where: spacesWhereUniqueInput
    create: XOR<spacesCreateWithoutCreated_byInput, spacesUncheckedCreateWithoutCreated_byInput>
  }

  export type spacesCreateManyCreated_byInputEnvelope = {
    data: spacesCreateManyCreated_byInput | spacesCreateManyCreated_byInput[]
    skipDuplicates?: boolean
  }

  export type spacesUpsertWithWhereUniqueWithoutCreated_byInput = {
    where: spacesWhereUniqueInput
    update: XOR<spacesUpdateWithoutCreated_byInput, spacesUncheckedUpdateWithoutCreated_byInput>
    create: XOR<spacesCreateWithoutCreated_byInput, spacesUncheckedCreateWithoutCreated_byInput>
  }

  export type spacesUpdateWithWhereUniqueWithoutCreated_byInput = {
    where: spacesWhereUniqueInput
    data: XOR<spacesUpdateWithoutCreated_byInput, spacesUncheckedUpdateWithoutCreated_byInput>
  }

  export type spacesUpdateManyWithWhereWithoutCreated_byInput = {
    where: spacesScalarWhereInput
    data: XOR<spacesUpdateManyMutationInput, spacesUncheckedUpdateManyWithoutCreated_byInput>
  }

  export type spacesScalarWhereInput = {
    AND?: spacesScalarWhereInput | spacesScalarWhereInput[]
    OR?: spacesScalarWhereInput[]
    NOT?: spacesScalarWhereInput | spacesScalarWhereInput[]
    id?: IntFilter<"spaces"> | number
    name?: StringFilter<"spaces"> | string
    created_at?: DateTimeFilter<"spaces"> | Date | string
    updated_at?: DateTimeFilter<"spaces"> | Date | string
    subject?: StringFilter<"spaces"> | string
    is_active?: BoolFilter<"spaces"> | boolean
    users_id?: IntFilter<"spaces"> | number
    is_deleted?: BoolFilter<"spaces"> | boolean
    deleted_at?: DateTimeNullableFilter<"spaces"> | Date | string | null
    slug?: StringFilter<"spaces"> | string
  }

  export type usersCreateWithoutSpacesInput = {
    email: string
    name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type usersUncheckedCreateWithoutSpacesInput = {
    id?: number
    email: string
    name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type usersCreateOrConnectWithoutSpacesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutSpacesInput, usersUncheckedCreateWithoutSpacesInput>
  }

  export type spaces_activation_timesCreateWithoutSpaceInput = {
    day_of_week: string
    start_time: string
  }

  export type spaces_activation_timesUncheckedCreateWithoutSpaceInput = {
    id?: number
    day_of_week: string
    start_time: string
  }

  export type spaces_activation_timesCreateOrConnectWithoutSpaceInput = {
    where: spaces_activation_timesWhereUniqueInput
    create: XOR<spaces_activation_timesCreateWithoutSpaceInput, spaces_activation_timesUncheckedCreateWithoutSpaceInput>
  }

  export type spaces_activation_timesCreateManySpaceInputEnvelope = {
    data: spaces_activation_timesCreateManySpaceInput | spaces_activation_timesCreateManySpaceInput[]
    skipDuplicates?: boolean
  }

  export type usersUpsertWithoutSpacesInput = {
    update: XOR<usersUpdateWithoutSpacesInput, usersUncheckedUpdateWithoutSpacesInput>
    create: XOR<usersCreateWithoutSpacesInput, usersUncheckedCreateWithoutSpacesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutSpacesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutSpacesInput, usersUncheckedUpdateWithoutSpacesInput>
  }

  export type usersUpdateWithoutSpacesInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateWithoutSpacesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type spaces_activation_timesUpsertWithWhereUniqueWithoutSpaceInput = {
    where: spaces_activation_timesWhereUniqueInput
    update: XOR<spaces_activation_timesUpdateWithoutSpaceInput, spaces_activation_timesUncheckedUpdateWithoutSpaceInput>
    create: XOR<spaces_activation_timesCreateWithoutSpaceInput, spaces_activation_timesUncheckedCreateWithoutSpaceInput>
  }

  export type spaces_activation_timesUpdateWithWhereUniqueWithoutSpaceInput = {
    where: spaces_activation_timesWhereUniqueInput
    data: XOR<spaces_activation_timesUpdateWithoutSpaceInput, spaces_activation_timesUncheckedUpdateWithoutSpaceInput>
  }

  export type spaces_activation_timesUpdateManyWithWhereWithoutSpaceInput = {
    where: spaces_activation_timesScalarWhereInput
    data: XOR<spaces_activation_timesUpdateManyMutationInput, spaces_activation_timesUncheckedUpdateManyWithoutSpaceInput>
  }

  export type spaces_activation_timesScalarWhereInput = {
    AND?: spaces_activation_timesScalarWhereInput | spaces_activation_timesScalarWhereInput[]
    OR?: spaces_activation_timesScalarWhereInput[]
    NOT?: spaces_activation_timesScalarWhereInput | spaces_activation_timesScalarWhereInput[]
    id?: IntFilter<"spaces_activation_times"> | number
    space_id?: IntFilter<"spaces_activation_times"> | number
    day_of_week?: StringFilter<"spaces_activation_times"> | string
    start_time?: StringFilter<"spaces_activation_times"> | string
  }

  export type spacesCreateWithoutSpaces_activation_timesInput = {
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    subject: string
    is_active: boolean
    is_deleted?: boolean
    deleted_at?: Date | string | null
    slug: string
    created_by: usersCreateNestedOneWithoutSpacesInput
  }

  export type spacesUncheckedCreateWithoutSpaces_activation_timesInput = {
    id?: number
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    subject: string
    is_active: boolean
    users_id: number
    is_deleted?: boolean
    deleted_at?: Date | string | null
    slug: string
  }

  export type spacesCreateOrConnectWithoutSpaces_activation_timesInput = {
    where: spacesWhereUniqueInput
    create: XOR<spacesCreateWithoutSpaces_activation_timesInput, spacesUncheckedCreateWithoutSpaces_activation_timesInput>
  }

  export type spacesUpsertWithoutSpaces_activation_timesInput = {
    update: XOR<spacesUpdateWithoutSpaces_activation_timesInput, spacesUncheckedUpdateWithoutSpaces_activation_timesInput>
    create: XOR<spacesCreateWithoutSpaces_activation_timesInput, spacesUncheckedCreateWithoutSpaces_activation_timesInput>
    where?: spacesWhereInput
  }

  export type spacesUpdateToOneWithWhereWithoutSpaces_activation_timesInput = {
    where?: spacesWhereInput
    data: XOR<spacesUpdateWithoutSpaces_activation_timesInput, spacesUncheckedUpdateWithoutSpaces_activation_timesInput>
  }

  export type spacesUpdateWithoutSpaces_activation_timesInput = {
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slug?: StringFieldUpdateOperationsInput | string
    created_by?: usersUpdateOneRequiredWithoutSpacesNestedInput
  }

  export type spacesUncheckedUpdateWithoutSpaces_activation_timesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    users_id?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type spacesCreateManyCreated_byInput = {
    id?: number
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    subject: string
    is_active: boolean
    is_deleted?: boolean
    deleted_at?: Date | string | null
    slug: string
  }

  export type spacesUpdateWithoutCreated_byInput = {
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slug?: StringFieldUpdateOperationsInput | string
    spaces_activation_times?: spaces_activation_timesUpdateManyWithoutSpaceNestedInput
  }

  export type spacesUncheckedUpdateWithoutCreated_byInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slug?: StringFieldUpdateOperationsInput | string
    spaces_activation_times?: spaces_activation_timesUncheckedUpdateManyWithoutSpaceNestedInput
  }

  export type spacesUncheckedUpdateManyWithoutCreated_byInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type spaces_activation_timesCreateManySpaceInput = {
    id?: number
    day_of_week: string
    start_time: string
  }

  export type spaces_activation_timesUpdateWithoutSpaceInput = {
    day_of_week?: StringFieldUpdateOperationsInput | string
    start_time?: StringFieldUpdateOperationsInput | string
  }

  export type spaces_activation_timesUncheckedUpdateWithoutSpaceInput = {
    id?: IntFieldUpdateOperationsInput | number
    day_of_week?: StringFieldUpdateOperationsInput | string
    start_time?: StringFieldUpdateOperationsInput | string
  }

  export type spaces_activation_timesUncheckedUpdateManyWithoutSpaceInput = {
    id?: IntFieldUpdateOperationsInput | number
    day_of_week?: StringFieldUpdateOperationsInput | string
    start_time?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}