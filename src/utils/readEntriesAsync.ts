/**
 * read entries of the directory
 */
export const readEntriesAsync = (reader: FileSystemDirectoryReader) =>
  new Promise<FileSystemEntry[]>((resolve, reject) => {
    reader.readEntries((entries) => {
      resolve(entries);
    });
  });
