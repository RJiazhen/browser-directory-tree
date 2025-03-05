# browser-directory-tree

使用浏览器创建一个目录树对象

## 安装

### 通过npm安装

```bash
npm install browser-directory-tree
```

### 在script标签中直接引入

```html
<script type="module">
  import { dirTree } from 'https://unpkg.com/browser-directory-tree@latest/dist/index.js';
</script>
```

## 使用

```ts
const dragZone = document.getElementById('dragZone');

dragZone.addEventListener('dragover', (e) => {
  e.preventDefault();
});

// 是的，需要通过浏览器的拖拽事件来获取entry，然后使用dirTree读取目录树
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

你也可以打开[https://browser-directory-tree-examples.vercel.app](https://browser-directory-tree-examples.vercel.app)，查看一个简单的示例。

## `dirTree`

### 类型

```ts
function dirTree(
  entry: FileSystemDirectoryEntry,
  options?: DirTreeOptions,
  fileCallback?: DirTreeFileCallback,
  directoryCallback?: DirTreeDirectoryCallback,
): Promise<DirTreeDirectoryItem>;

type DirTreeOptions = {
  exclude?: RegExp | RegExp[]; // 默认undefined
  extensions?: RegExp; // 默认undefined
  attributes?: FileAttributes[]; // 默认[]
  depth?: number; // 默认Infinity
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

### 详细信息

#### `entry`

根目录的入口，可以通过浏览器的拖拽事件获取。

```ts
const entry: FileSystemDirectoryEntry = item.webkitGetAsEntry();
```

#### `options`

执行dirTree时，可以传入一个options对象，用于配置目录树的选项。

```ts
const options: DirTreeOptions = {
  exclude: /\.txt$/,
  extensions: /\.js$/,
  attributes: ['lastModified', 'size'],
  depth: 2,
};
```

##### `options.exclude`

一个正则表达式或正则表达式数组，用于排除某些文件或目录，当文件或目录的名称匹配到正则表达式时，将不会被读取。

##### `options.extensions`

一个正则表达式，用于匹配文件的扩展名。

当该选项被设置时，只有当文件的扩展名匹配到正则表达式时，才会被读取。

##### `options.attributes`

一个数组，用于指定额外返回的文件或目录的属性。

默认情况下，返回的文件或目录的属性只有：

- [`name`](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemEntry/name)：文件或目录的名称
- [`path`](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemEntry/fullPath)：文件或目录相对于根目录的路径

当设置`options.attributes`时，返回的文件或目录的属性会包含：

- [`lastModified`](https://developer.mozilla.org/en-US/docs/Web/API/File/lastModified)：文件或目录的最后修改时间的时间戳。
- [`lastModifiedDate`](https://developer.mozilla.org/en-US/docs/Web/API/File/lastModifiedDate)：文件或目录的最后修改时间对象；
- [`size`](https://developer.mozilla.org/en-US/docs/Web/API/Blob/size)：文件或目录的大小。
- [`type`](https://developer.mozilla.org/en-US/docs/Web/API/Blob/type)：文件或目录的类型。
- [`webkitRelativePath`](https://developer.mozilla.org/en-US/docs/Web/API/File/webkitRelativePath)：文件或目录相对于根目录的路径
- [`isFile`](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemEntry/isFile)：是否为文件
- [`isDirectory`](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemEntry/isDirectory)：是否为目录

##### `options.depth`

一个数字，用于指定目录树的深度。默认为`Infinity`，表示无限深度。

#### `fileCallback`

一个回调函数，用于处理文件。在读取文件时，会调用该回调函数，并传入该文件的`dirTreeFileItem`、`path`、`entry`。

```ts
const fileCallback: DirTreeFileCallback = (dirTreeFileItem: DirTreeFileItem, path: string, entry: FileSystemFileEntry) => {
  console.log(item, path, entry);
};
```

#### `directoryCallback`

一个回调函数，用于处理目录。在读取目录时，会调用该回调函数，并传入该目录的`dirTreeDirectoryItem`、`path`、`entry`。

```ts
const directoryCallback: DirTreeDirectoryCallback = (dirTreeDirectoryItem: DirTreeDirectoryItem, path: string, entry: FileSystemDirectoryEntry) => {
  console.log(dirTreeDirectoryItem, path, entry);
};
```

#### 返回值

一个DirTreeDirectoryItem对象，表示目录树的根目录。

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
