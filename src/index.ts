import { checkExclude } from './utils/checkExclude';
import { normalizeOptions } from './utils/normalizeOptions';
import { readFile } from './utils/readFile';
import { readEntriesAsync } from './utils/readEntriesAsync';

export const dirTree: DirTree = async (
  entry,
  options,
  fileCallback,
  directoryCallback,
) => {
  const normalizedOptions = normalizeOptions(options);

  const { exclude, extensions, attributes, depth } = normalizedOptions;

  /**
   * the result of the directory tree
   */
  const result: DirTreeDirectoryItem = {
    name: entry.name,
    path: entry.fullPath,
    ...(attributes.includes('isFile') && { isFile: false }),
    ...(attributes.includes('isDirectory') && { isDirectory: true }),
    children: [],
  };

  if (depth === 0) {
    return result;
  }

  const reader = entry.createReader();

  const entries = await readEntriesAsync(reader);

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    // if the entry is a file, read the file and push the file item to the result
    if (entry.isFile) {
      const fileEntry = entry as FileSystemFileEntry;

      const fileItem = await readFile(fileEntry, attributes);

      const isExcluded = checkExclude(fileItem.path, exclude);
      if (isExcluded) {
        continue;
      }

      const isMatchExtension = extensions.test(fileItem.name);
      if (!isMatchExtension) {
        continue;
      }

      result.children.push(fileItem);
      fileCallback?.(fileItem, fileItem.path, fileEntry);
    }

    // if the entry is a directory, read the directory recursively
    else if (entry.isDirectory) {
      const directory = entry as FileSystemDirectoryEntry;

      const isExcluded = checkExclude(directory.fullPath, exclude);
      if (isExcluded) {
        continue;
      }

      const item = await dirTree(
        directory,
        {
          ...options,
          depth: depth - 1,
        },
        fileCallback,
        directoryCallback,
      );
      result.children.push(item);
      directoryCallback?.(item, item.path, directory);
    }
  }

  return result;
};
