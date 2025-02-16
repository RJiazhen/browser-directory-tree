/**
 * Check if the path is excluded from the directory tree.
 */
export const checkExclude = (path: string, exclude: RegExp[]): boolean => {
  return exclude.some((reg) => {
    return reg.test(path);
  });
};
