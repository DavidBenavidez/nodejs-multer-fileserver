// import {
//   filesRepository,
// } from '../repository'

import makeCreateFile from './create-file';
import makeDeleteFile from './delete-file';
import makeListFiles from './list-files';
import makeGetFile from './get-file';

export const createFile = makeCreateFile();
export const deleteFile = makeDeleteFile();
export const listFiles = makeListFiles();
export const getFile = makeGetFile();