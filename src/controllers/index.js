// import use cases and unject them here
import {
  createFile,
  deleteFile,
  getFile,
  listFiles,
} from '../use-cases';
import makeFilesController from './files';


export const filesController = makeFilesController({
  createFile,
  listFiles,
  getFile,
  deleteFile,
})
