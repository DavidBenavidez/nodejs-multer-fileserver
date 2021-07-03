import fs from 'fs';
import path from 'path';

export default function makeListFiles({
  fileRepository
}) {
  return async function listFiles() {
    try {
      const files = await fileRepository.findAll();
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