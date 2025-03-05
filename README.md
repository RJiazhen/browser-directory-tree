# browser-directory-tree

[中文文档](https://github.com/RJiazhen/browser-directory-tree/docs/README.zh-CN.md)

Note: Translate from [中文文档](https://github.com/RJiazhen/browser-directory-tree/docs/README.zh-CN.md) by AI, if you find any mistakes, please help me correct them.

Creates a directory tree object by browser.

## Install

### Install by npm

```bash
npm install browser-directory-tree
```

### Import in script tag

```html
<script type="module">
  import { dirTree } from 'https://unpkg.com/browser-directory-tree@latest/dist/index.js';
</script>
```

## Usage

```ts
const dragZone = document.getElementById('dragZone');

dragZone.addEventListener('dragover', (e) => {
  e.preventDefault();
});

// Yes, you need to get the entry through the browser's drag event, and then use dirTree to read the directory tree
dragZone.addEventListener('drop', async (event) => {
  event.preventDefault();
  const items = event.dataTransfer.items;
  for (const item of items) {
    if (item.kind !== 'file') {
      continue;
    }

    const entry = item.webkitGetAsEntry();
    if (!entry.isDirectory) {
      continue;
    }

    const result = await dirTree(entry);
    console.log(result);
  }
});
```

You can also open [https://browser-directory-tree-examples.vercel.app](https://browser-directory-tree-examples.vercel.app) to view a simple example.

## `dirTree`

### Type

```ts
function dirTree(
  entry: FileSystemDirectoryEntry,
  options?: DirTreeOptions,
  fileCallback?: DirTreeFileCallback,
  directoryCallback?: DirTreeDirectoryCallback,
): Promise<DirTreeDirectoryItem>;

type DirTreeOptions = {
  exclude?: RegExp | RegExp[]; // Default: undefined
  extensions?: RegExp; // Default: undefined
  attributes?: FileAttributes[]; // Default: []
  depth?: number; // Default: Infinity
};

type FileAttributes = 'lastModified' | 'lastModifiedDate' | 'size' | 'type' | 'webkitRelativePath' | 'isFile' | 'isDirectory';

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
```

### Details

#### `entry`

The entry of the root directory, which can be obtained through the browser's drag event.

```ts
const entry: FileSystemDirectoryEntry = item.webkitGetAsEntry();
```

#### `options`

When executing dirTree, you can pass in an options object to configure the directory tree options.

```ts
const options: DirTreeOptions = {
  exclude: /\.txt$/,
  extensions: /\.js$/,
  attributes: ['lastModified', 'size'],
  depth: 2,
};
```

##### `options.exclude`

A regular expression or an array of regular expressions, used to exclude certain files or directories.

When the name of the file or directory matches the regular expression, it will not be read.

##### `options.extensions`

A regular expression, used to match the file extension.

When this option is set, only when the file extension matches the regular expression, it will be read.

##### `options.attributes`

An array, used to specify additional file or directory attributes to return.

By default, the attributes of the file or directory returned are only:

- [`name`](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemEntry/name)：The name of the file or directory.
- [`path`](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemEntry/fullPath)：The path of the file or directory relative to the root directory.

When `options.attributes` is set, the attributes of the file or directory returned will include:

- [`lastModified`](https://developer.mozilla.org/en-US/docs/Web/API/File/lastModified)：The timestamp of the last modification time of the file or directory.
- [`lastModifiedDate`](https://developer.mozilla.org/en-US/docs/Web/API/File/lastModifiedDate)：The last modification time `Date` object of the file or directory;
- [`size`](https://developer.mozilla.org/en-US/docs/Web/API/Blob/size)：The size of the file or directory.
- [`type`](https://developer.mozilla.org/en-US/docs/Web/API/Blob/type)：The type of the file or directory.
- [`webkitRelativePath`](https://developer.mozilla.org/en-US/docs/Web/API/File/webkitRelativePath)：The path of the file or directory relative to the root directory.
- [`isFile`](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemEntry/isFile)：Whether it is a file
- [`isDirectory`](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemEntry/isDirectory)：Whether it is a directory

##### `options.depth`

A number, used to specify the depth of the directory tree. The default is `Infinity`, which means infinite depth.

#### `fileCallback`

A callback function, used to handle files. When reading a file, this callback function will be called, and the `dirTreeFileItem`, `path`, and `entry` of the file will be passed in.

```ts
const fileCallback: DirTreeFileCallback = (dirTreeFileItem: DirTreeFileItem, path: string, entry: FileSystemFileEntry) => {
  console.log(dirTreeFileItem, path, entry);
};
```

#### `directoryCallback`

A callback function, used to handle directories. When reading a directory, this callback function will be called, and the `dirTreeDirectoryItem`, `path`, and `entry` of the directory will be passed in.

```ts
const directoryCallback: DirTreeDirectoryCallback = (dirTreeDirectoryItem: DirTreeDirectoryItem, path: string, entry: FileSystemDirectoryEntry) => {
  console.log(dirTreeDirectoryItem, path, entry);
};
```

#### Return value

A `DirTreeDirectoryItem` object, representing the root directory of the directory tree.

```ts
const result: DirTreeDirectoryItem = {
  name: string;
  path: string;
  children: (DirTreeDirectoryItem | DirTreeFileItem)[];
}

interface DirTreeDirectoryItem {
  name: string;
  path: string;
  children: (DirTreeDirectoryItem | DirTreeFileItem)[];
}

interface DirTreeFileItem {
  name: string;
  path: string;
}
```
