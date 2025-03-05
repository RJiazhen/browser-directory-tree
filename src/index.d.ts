interface DirTree {
  (
    /**
     * The entry of the directory to read.
     */
    entry: FileSystemDirectoryEntry,
    /**
     * Options for the directory tree.
     */
    options?: DirTreeOptions,
    /**
     * Callbacks for each file.
     */
    fileCallback?: PartialParameters<DirTreeFileCallback>,
    /**
     * Callbacks for each directory.
     */
    directoryCallback?: PartialParameters<DirTreeDirectoryCallback>,
  ): Promise<DirTreeDirectoryItem>;
}

type FileAttributes =
  | 'lastModified'
  | 'lastModifiedDate'
  | 'size'
  | 'type'
  | 'webkitRelativePath'
  | 'isFile'
  | 'isDirectory';

interface DirTreeOptions {
  /**
   * A RegExp or an array of RegExp to test for exclusion. When match, the file is excluded.
   * @default undefined
   */
  exclude?: RegExp | RegExp[];
  /**
   * A RegExp to test for inclusion. When match, the file is included.
   * @default undefined
   */
  extensions?: RegExp;
  /**
   * An array of file attributes that return in the file object.
   * @default []
   */
  attributes?: FileAttributes[];
  /**
   * If presented, reads so many nested levels of directories. Default is infinite.
   * @default Infinity
   */
  depth?: number;
}

type DirTreeFileCallback = (
  item: DirTreeFileItem,
  path: string,
  entry: FileSystemFileEntry,
) => void;

type DirTreeDirectoryCallback = (
  item: DirTreeDirectoryItem,
  path: string,
  entry: FileSystemDirectoryEntry,
) => void;

interface DirTreeDirectoryItem {
  name: string;
  path: string;
  children: (DirTreeDirectoryItem | DirTreeFileItem)[];
}

interface DirTreeFileItem {
  name: string;
  path: string;
}

declare module 'browser-directory-tree' {
  export const dirTree: DirTree;
}
