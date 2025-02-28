import { dirTree } from './index';

declare global {
  interface Window {
    dirTree: typeof dirTree;
  }
}

window.dirTree = dirTree;
