import { checkExclude } from './utils/checkExclude';
import { normalizeOptions } from './utils/normalizeOptions';

export const dirTree: DirTree = async (
  entry,
  options,
  fileCallback,
  directoryCallback,
) => {
  const normalizedOptions = normalizeOptions(options);

  // TODO the feature of all options is not implemented yet
  const { exclude, extensions, attributes, depth } = normalizedOptions;

  /**
   * the result of the directory tree
   */
  const result: DirTreeDirectoryItem = {
    name: entry.name,
    path: entry.fullPath,
    children: [],
  };

  /**
   * read file and return the file item
   */
  const readFile = (fileEntry: FileSystemFileEntry) =>
    new Promise<DirTreeFileItem>((resolve, reject) => {
      fileEntry.file((file) => {
        const item: DirTreeFileItem = {
          name: file.name,
          path: fileEntry.fullPath + '/' + file.name,
        };
        resolve(item);
      });
    });

  /**
   * read and return entries of the directory
   */
  const readEntriesAsync = (reader: FileSystemDirectoryReader) =>
    new Promise<FileSystemEntry[]>((resolve, reject) => {
      reader.readEntries((entries) => {
        resolve(entries);
      });
    });

  const reader = entry.createReader();

  const entries = await readEntriesAsync(reader);

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    // if the entry is a file, read the file and push the file item to the result
    if (entry.isFile) {
      const fileEntry = entry as FileSystemFileEntry;

      const item = await readFile(fileEntry);

      const isExcluded = checkExclude(item.path, exclude);
      if (isExcluded) {
        continue;
      }

      const isMatchExtension = extensions.test(item.name);
      if (!isMatchExtension) {
        continue;
      }

      result.children.push(item);
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
        options,
        fileCallback,
        directoryCallback,
      );
      result.children.push(item);
    }
  }

  return result;
};
