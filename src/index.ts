export const dirTree: DirTree = (
  entry,
  options,
  fileCallback,
  directoryCallback,
) => {
  const result: DirTreeItem<'directory'> = {
    name: entry.name,
    path: entry.fullPath,
    type: 'directory',
    stats: {
      name: entry.name,
      fullPath: entry.fullPath,
    },
    children: [],
  };

  const readDirectory = (entry, options, fileCallback, directoryCallback) => {
    // TODO implement
  };

  return result;
};
