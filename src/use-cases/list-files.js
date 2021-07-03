import fs from 'fs';
import path from 'path';

/**
 * Makes the list files use case
 * @param {Object} param0 dependencies
 */
export default function makeListFiles({
  fileRepository
}) {
  return async function listFiles() {
    try {
      const files = await fileRepository.findAll();
      const filenames = files.map((file) => file.filename);
      const localFilePath = process.env.FOLDER;
      const localFiles = fs.readdirSync(localFilePath);

      // delete file if its not in db
      localFiles.forEach((file) =>
        !filenames.includes(file) && fs.unlinkSync(`${localFilePath}/${file}`)
      )

      return files;
    } catch (error) {
      console.log('Error in retrieving files: ', error);
      return {
        error,
      };
    }
  }
}