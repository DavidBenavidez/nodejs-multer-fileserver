export default function makeFilesController(useCases) {
  const create = async (req, res) => {
    const data = await useCases.createFile(req);

    return res.jsonResponse(data);
  }

  const deleteFile = async (_, res) => {
    const data = await useCases.deleteFile();

    return res.status(200).json({
      result: data,
      description: data? 'Successfully deleted file.' : 'File not found',
      statusCode: data? 200 : 404,
    });
  }

  const get = async (req, res) => {
    const stream = await useCases.getFile(req);

    return res.status(200).json({
      data: stream,
      result: true,
      statusCode: 200,
    });
  }

  return {
    delete: deleteFile,
    create,
    get,
  }
}