import { File } from '../models';

export default function makeGetFile() {
  return async function getFile(req) {
    const { publicKey } = req.params;
    const file = await File.findOne({ publicKey });

    return file;
  }
}