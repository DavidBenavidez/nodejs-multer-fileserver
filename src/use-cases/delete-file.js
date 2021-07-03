import { File } from '../models';

export default function makeDeleteFile() {
  return async function deleteFile(req) {
    const { privateKey } = req.params;
    const response = await File.deleteOne({ privateKey });

    return {
      deletedCount: response.deletedCount
    };
  }
}