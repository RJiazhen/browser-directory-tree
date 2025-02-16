/**
 * read file and return the file item
 */
export const readFile = (fileEntry: FileSystemFileEntry) =>
  new Promise<DirTreeFileItem>((resolve, reject) => {
    fileEntry.file((file) => {
      const item: DirTreeFileItem = {
        name: file.name,
        path: fileEntry.fullPath + '/' + file.name,
      };
      resolve(item);
    });
  });
