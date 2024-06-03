import type { Brand } from "./brand";

type Ok<T> = Brand<{ value: T }, "Ok">;
type Err<E> = Brand<{ error: E }, "Err">;

export class Result<T, E> {
  private value: Ok<T> | Err<E>;

  private constructor(value: Ok<T> | Err<E>) {
    this.value = value;
  }

  static ok<T>(value: T): Result<T, never> {
    return new Result({ value, __brand: "Ok" } as Ok<T>);
  }

  static err<E>(error: E): Result<never, E> {
    return new Result({ error, __brand: "Err" } as Err<E>);
  }

  isOk(): this is Result<T, never> {
    return (this.value as Ok<T>).__brand === "Ok";
  }

  isErr(): this is Result<never, E> {
    return (this.value as Err<E>).__brand === "Err";
  }

  unwrap(): T {
    if (!this.isOk()) {
      throw new Error(
        `Tried to unwrap an Err value: ${(this.value as Err<E>).error}`
      );
    }
    return (this.value as Ok<T>).value;
  }

  unwrapErr(): E {
    if (!this.isErr()) {
      throw new Error(
        `Tried to unwrap an Ok value: ${(this.value as Ok<T>).value}`
      );
    }
    return (this.value as Err<E>).error;
  }

  expect(message: string): T {
    if (!this.isOk()) {
      throw new Error(message);
    }
    return (this.value as Ok<T>).value;
  }

  expectErr(message: string): E {
    if (!this.isErr()) {
      throw new Error(message);
    }
    return (this.value as Err<E>).error;
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    if (this.isOk()) {
      return Result.ok(fn((this.value as Ok<T>).value));
    } else {
      return Result.err((this.value as Err<E>).error);
    }
  }

  mapErr<F>(fn: (error: E) => F): Result<T, F> {
    if (this.isErr()) {
      return Result.err(fn((this.value as Err<E>).error));
    } else {
      return Result.ok((this.value as Ok<T>).value);
    }
  }

  andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    if (this.isOk()) {
      return fn((this.value as Ok<T>).value);
    } else {
      return Result.err((this.value as Err<E>).error);
    }
  }

  orElse<F>(fn: (error: E) => Result<T, F>): Result<T, F> {
    if (this.isErr()) {
      return fn((this.value as Err<E>).error);
    } else {
      return Result.ok((this.value as Ok<T>).value);
    }
  }

  unwrapOr<U>(defaultValue: U): T | U {
    if (this.isOk()) {
      return (this.value as Ok<T>).value;
    } else {
      return defaultValue;
    }
  }

  unwrapOrElse<U>(fn: (error: E) => U): T | U {
    if (this.isOk()) {
      return (this.value as Ok<T>).value;
    } else {
      return fn((this.value as Err<E>).error);
    }
  }
}
