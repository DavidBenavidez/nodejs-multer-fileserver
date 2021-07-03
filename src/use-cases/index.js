import * as helpers from '../helpers';
import {
  fileRepository,
  userRepository,
} from '../repository'

import makeCreateFile from './create-file';
import makeDeleteFile from './delete-file';
import makeListFiles from './list-files';
import makeGetFile from './get-file';

export const createFile = makeCreateFile({
  fileRepository,
  userRepository,
  helpers,
});
export const deleteFile = makeDeleteFile({
  fileRepository,
});
export const listFiles = makeListFiles({
  fileRepository,
});
export const getFile = makeGetFile({
  helpers,
  fileRepository,
  userRepository,
});