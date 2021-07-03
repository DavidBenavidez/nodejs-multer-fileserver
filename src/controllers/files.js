import path from 'path';

export default function makeFilesController(useCases) {
  const create = async (req, res) => {
    const data = await useCases.createFile(req);

    return res.status(200).jsonResponse(data);
  }

  const list = async (_, res) => {
    const data = await useCases.listFiles();

    return res.status(200).jsonResponse(data);
  }

  const get = async (req, res) => {
    const file = await useCases.getFile(req);
    const localFilePath = path.resolve(__dirname, `../../public/files/${file?.filename}`);

    if(file.error) {
      return res.status(400).jsonResponse(null, file);
    }

    return res.download(localFilePath, file.originalname);
  }

  const deleteFile = async (req, res) => {
    const response = await useCases.deleteFile(req);

    return res.status(200).jsonResponse({
      ...response,
      message: 'Successfully deleted file',
    })
  }

  return {
    create,
    list,
    get,
    delete: deleteFile,
  }
}