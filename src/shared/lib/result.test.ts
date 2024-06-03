// result.test.ts
import { describe, it, expect } from 'vitest';
import { Result } from './result';

describe('Result', () => {
  it('should create an Ok result', () => {
    const result = Result.ok(42);
    expect(result.isOk()).toBe(true);
    expect(result.isErr()).toBe(false);
    expect(result.unwrap()).toBe(42);
  });

  it('should create an Err result', () => {
    const result = Result.err("error");
    expect(result.isOk()).toBe(false);
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr()).toBe("error");
  });

  it('unwrap should throw an error for Err result', () => {
    const result = Result.err("error");
    expect(() => result.unwrap()).toThrow("Tried to unwrap an Err value: error");
  });

  it('unwrapErr should throw an error for Ok result', () => {
    const result = Result.ok(42);
    expect(() => result.unwrapErr()).toThrow("Tried to unwrap an Ok value: 42");
  });

  it('expect should return value for Ok result', () => {
    const result = Result.ok(42);
    expect(result.expect("error message")).toBe(42);
  });

  it('expect should throw an error for Err result', () => {
    const result = Result.err("error");
    expect(() => result.expect("error message")).toThrow("error message");
  });

  it('expectErr should return error for Err result', () => {
    const result = Result.err("error");
    expect(result.expectErr("error message")).toBe("error");
  });

  it('expectErr should throw an error for Ok result', () => {
    const result = Result.ok(42);
    expect(() => result.expectErr("error message")).toThrow("error message");
  });

  it('map should transform Ok value', () => {
    const result = Result.ok(42).map(value => value + 1);
    expect(result.unwrap()).toBe(43);
  });

  it('map should not transform Err value', () => {
    const result = Result.err("error").map(value => value + 1);
    expect(result.unwrapErr()).toBe("error");
  });

  it('mapErr should transform Err value', () => {
    const result = Result.err("error").mapErr(error => error + "!");
    expect(result.unwrapErr()).toBe("error!");
  });

  it('mapErr should not transform Ok value', () => {
    const result = Result.ok(42).mapErr(error => error + "!");
    expect(result.unwrap()).toBe(42);
  });

  it('andThen should chain Ok results', () => {
    const result = Result.ok(42).andThen(value => Result.ok(value + 1));
    expect(result.unwrap()).toBe(43);
  });

  it('andThen should not chain on Err result', () => {
    const result = Result.err("error").andThen(value => Result.ok(value + 1));
    expect(result.unwrapErr()).toBe("error");
  });

  it('orElse should chain Err results', () => {
    const result = Result.err("error").orElse(error => Result.err(error + "!"));
    expect(result.unwrapErr()).toBe("error!");
  });

  it('orElse should not chain on Ok result', () => {
    const result = Result.ok(42).orElse(error => Result.err(error + "!"));
    expect(result.unwrap()).toBe(42);
  });

  it('unwrapOr should return value for Ok result', () => {
    const result = Result.ok(42);
    expect(result.unwrapOr(0)).toBe(42);
  });

  it('unwrapOr should return default value for Err result', () => {
    const result = Result.err("error");
    expect(result.unwrapOr(0)).toBe(0);
  });

  it('unwrapOrElse should return value for Ok result', () => {
    const result = Result.ok(42);
    expect(result.unwrapOrElse(error => 0)).toBe(42);
  });

  it('unwrapOrElse should return computed value for Err result', () => {
    const result = Result.err("error");
    expect(result.unwrapOrElse(error => 0)).toBe(0);
  });
});
