/**
 * normalize the options
 */
export const normalizeOptions = (options: DirTreeOptions = {}) => {
  const DEFAULT_OPTIONS = {
    exclude: [],
    extensions: /.*$/,
    attributes: [],
    normalizePath: false,
    depth: Infinity,
  } as const;

  const exclude = (() => {
    if (Array.isArray(options.exclude)) {
      const normalizedExclude = options.exclude.map((item: RegExp | any) => {
        return item instanceof RegExp ? item : new RegExp(item);
      });
      return normalizedExclude;
    }

    if (typeof options.exclude === 'string') {
      return [new RegExp(options.exclude)];
    }

    if (options.exclude instanceof RegExp) {
      return [options.exclude];
    }

    return DEFAULT_OPTIONS.exclude;
  })();

  return {
    exclude,
    extensions: options.extensions || DEFAULT_OPTIONS.extensions,
    attributes: options.attributes || DEFAULT_OPTIONS.attributes,
    normalizePath: options.normalizePath || DEFAULT_OPTIONS.normalizePath,
    depth: options.depth || DEFAULT_OPTIONS.depth,
  };
};
