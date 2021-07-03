import path from 'path';

/**
 * Creates the FileController
 * Injects the useCases needed for the file controller
 * @param {Object} dependencies
 */
export default function makeFilesController(useCases) {
  /**
   * Creates/Inserts a file into the database
   */
  const create = async (req, res) => {
    const data = await useCases.createFile(req);

    return res.status(200).jsonResponse(data);
  }

  /**
   * lists the files from the local server
   */
  const list = async (_, res) => {
    const data = await useCases.listFiles();

    return res.status(200).jsonResponse(data);
  }

  /**
   * Downloads a file from the local server
   */
  const get = async (req, res) => {
    const file = await useCases.getFile(req);
    const localFilePath = path.resolve(__dirname, `../../public/files/${file?.filename}`);

    if(file.error) {
      return res.status(400).jsonResponse(null, file);
    }

    return res.download(localFilePath, file.originalname);
  }

  /**
   * Deletes a file from the local server
   */
  const deleteFile = async (req, res) => {
    const response = await useCases.deleteFile(req);

    if(response.error) {
      return res.status(401).jsonResponse(null, response);
    }

    return res.status(200).jsonResponse({
      ...response,
      message: 'Successfully deleted file',
    });
  }

  return {
    create,
    list,
    get,
    delete: deleteFile,
  }
}