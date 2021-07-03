import fs from 'fs';
import path from 'path';
import { File } from '../models';

export default function makeListFiles() {
  return async function listFiles() {
    try {
      const files = await File.find({});
      const filenames = files.map((file) => file.filename);
      const localFilePath = path.resolve(__dirname, '../../public/files');
      const localFiles = fs.readdirSync(localFilePath);

      // delete file if its not in db
      localFiles.forEach((file) =>
        !filenames.includes(file) && fs.unlinkSync(`${localFilePath}/${file}`)
      )

      return files;
    } catch (error) {
      console.log('Error in retrieving files: ', error);
      return res.status(500).jsonResponse(null, {
        error,
      });
    }
  }
}