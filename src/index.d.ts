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
  ): DirTreeItem<'directory'>;
}

interface DirTreeOptions {
  /**
   * A RegExp or an array of RegExp to test for exclusion. When match, the file is excluded.
   * @default undefined
   */
  exclude?: RegExp | RegExp[] | string | string[];
  /**
   * A RegExp or an array of RegExp to test for inclusion. When match, the file is included.
   * @default undefined
   */
  extensions?: RegExp | RegExp[] | string | string[];
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
  depth: number;
}

type DirTreeFileCallback = (
  item: DirTreeItem<'file'>,
  path: string,
  stats: File,
) => void;

type DirTreeDirectoryCallback = (
  item: DirTreeItem<'directory'>,
  path: string,
  stats: Pick<FileSystemDirectoryEntry, 'name' | 'fullPath'>,
) => void;

interface DirTreeItem<T extends 'file' | 'directory'> {
  name: string;
  path: string;
  type: T;
  stats: T extends 'file'
    ? File
    : Pick<FileSystemDirectoryEntry, 'name' | 'fullPath'>;
  children: T extends 'directory' ? DirTreeItem<'file' | 'directory'>[] : never;
}
