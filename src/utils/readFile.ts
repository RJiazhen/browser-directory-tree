/**
 * read file and return the file item
 */
export const readFile = (
  fileEntry: FileSystemFileEntry,
  attributes: FileAttributes[],
) =>
  new Promise<DirTreeFileItem>((resolve) => {
    fileEntry.file((file) => {
      const attributesEntries = attributes
        .map((attribute) => [attribute, file[attribute]])
        .filter(([_, value]) => value !== undefined);

      const attributesObj = Object.fromEntries(attributesEntries);

      const item: DirTreeFileItem = {
        name: file.name,
        path: fileEntry.fullPath,
        ...(attributes.includes('isFile') && { isFile: true }),
        ...(attributes.includes('isDirectory') && { isDirectory: false }),
        ...attributesObj,
      };
      resolve(item);
    });
  });
