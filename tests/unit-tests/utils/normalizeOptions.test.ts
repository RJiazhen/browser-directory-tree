import { describe, it, expect } from 'vitest';
import { normalizeOptions } from '../../../src/utils/normalizeOptions';

describe('normalizeOptions', () => {
  it('should return default options when no options are provided', () => {
    const result = normalizeOptions();
    expect(result).toEqual<DirTreeOptions>({
      exclude: [],
      extensions: /.*$/,
      attributes: [],
      depth: Infinity,
    });
  });

  it('should normalize exclude as an array of regex when provided as an array of regex', () => {
    const regex1 = /test/;
    const regex2 = /example/;
    const result = normalizeOptions({ exclude: [regex1, regex2] });
    expect(result.exclude).toEqual([regex1, regex2]);
  });
  it('should normalize exclude as an array of regex when provided as a single string', () => {
    const result = normalizeOptions({ exclude: /test/ });
    expect(result.exclude).toEqual([/test/]);
  });

  it('should normalize exclude as an array of regex when provided as a single regex', () => {
    const regex = /test/;
    const result = normalizeOptions({ exclude: regex });
    expect(result.exclude).toEqual([regex]);
  });

  it('should return provided extensions when provided', () => {
    const extensions = /\.js$/;
    const result = normalizeOptions({ extensions });
    expect(result.extensions).toBe(extensions);
  });

  it('should return default extensions when no extensions are provided', () => {
    const result = normalizeOptions();
    expect(result.extensions).toMatchObject(/.*$/);
  });

  it('should return provided attributes when provided', () => {
    const attributes: Array<keyof File> = ['lastModified', 'size'];
    const result = normalizeOptions({ attributes });
    expect(result.attributes).toEqual(attributes);
  });

  it('should return default attributes when no attributes are provided', () => {
    const result = normalizeOptions();
    expect(result.attributes).toEqual([]);
  });

  it('should return provided depth when provided', () => {
    const result = normalizeOptions({ depth: 5 });
    expect(result.depth).toBe(5);
  });

  it('should return default depth when depth is negative', () => {
    const result = normalizeOptions({ depth: -5 });
    expect(result.depth).toBe(Infinity);
  });

  it('should return provided depth when depth is zero', () => {
    const result = normalizeOptions({ depth: 0 });
    expect(result.depth).toBe(0);
  });

  it('should return default depth when no depth is provided', () => {
    const result = normalizeOptions();
    expect(result.depth).toBe(Infinity);
  });
});
