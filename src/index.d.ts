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
    fileCallback?: DirTreeFileCallback,
    /**
     * Callbacks for each directory.
     */
    directoryCallback?: DirTreeDirectoryCallback,
  ): Promise<DirTreeDirectoryItem>;
}

interface DirTreeOptions {
  /**
   * A RegExp or an array of RegExp to test for exclusion. When match, the file is excluded.
   * @default undefined
   */
  exclude?: RegExp | RegExp[];
  /**
   * A RegExp or an array of RegExp to test for inclusion. When match, the file is included.
   * @default undefined
   */
  extensions?: RegExp;
  // TODO change to browser's file attributes
  /**
   * An array of file attributes that return in the file object. By default, all attributes are returned.
   */
  attributes?: (keyof File)[];
  /**
   * If true, windows style paths are used on all systems. Default is false.
   * @default false
   */
  normalizePath?: boolean;
  /**
   * If presented, reads so many nested levels of directories. Default is infinite.
   * @default Infinity
   */
  depth?: number;
}

type DirTreeFileCallback = (
  item: DirTreeFileItem,
  path: string,
  stats: File,
) => void;

type DirTreeDirectoryCallback = (
  item: DirTreeDirectoryItem,
  path: string,
  stats: Pick<FileSystemDirectoryEntry, 'name' | 'fullPath'>,
) => void;

interface DirTreeDirectoryItem {
  name: string;
  path: string;
  children: (DirTreeDirectoryItem | DirTreeFileItem)[];
  // TODO dynamic attributes
}

interface DirTreeFileItem {
  name: string;
  path: string;
}
