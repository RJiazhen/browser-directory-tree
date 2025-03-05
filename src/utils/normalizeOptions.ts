/**
 * normalize the options
 */
export const normalizeOptions = (options: DirTreeOptions = {}) => {
  const DEFAULT_OPTIONS = {
    exclude: [],
    extensions: /.*$/,
    attributes: [],
    depth: Infinity,
  };

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

  const depth = (() => {
    if (typeof options.depth === 'number' && options.depth >= 0) {
      return options.depth;
    }

    return DEFAULT_OPTIONS.depth;
  })();

  return {
    exclude,
    extensions: options.extensions || DEFAULT_OPTIONS.extensions,
    attributes: options.attributes || DEFAULT_OPTIONS.attributes,
    depth,
  };
};
