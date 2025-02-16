import { checkExclude } from '../../../src/utils/checkExclude';
import { describe, it, expect } from 'vitest';

describe('checkExclude', () => {
  it('should return false if no exclude patterns are provided', () => {
    expect(checkExclude('/some/path', [])).toBe(false);
  });

  it('should return false if none of the exclude patterns match the path', () => {
    expect(checkExclude('/some/path', [/^\/another/, /^\/path/])).toBe(false);
  });

  it('should return true if the path matches one of the exclude patterns', () => {
    expect(checkExclude('/some/path', [/^\/some/])).toBe(true);
  });

  it('should return true if the path matches any of the multiple exclude patterns', () => {
    expect(checkExclude('/some/path', [/^\/another/, /^\/some/])).toBe(true);
  });

  it('should handle case sensitivity in exclude patterns', () => {
    expect(checkExclude('/some/path', [/^\/SOME/])).toBe(false);
    expect(checkExclude('/some/path', [/^\/SOME/i])).toBe(true);
  });

  it('should handle paths with special characters', () => {
    expect(checkExclude('/some/path@123', [/^\/some\/path@123/])).toBe(true);
  });

  it('should return false for an empty path with no exclude patterns', () => {
    expect(checkExclude('', [])).toBe(false);
  });

  it('should return false for an empty path with non-matching exclude patterns', () => {
    expect(checkExclude('', [/^\/some/])).toBe(false);
  });

  it('should return true for an empty path with a matching exclude pattern', () => {
    expect(checkExclude('', [/^$/])).toBe(true);
  });
});
