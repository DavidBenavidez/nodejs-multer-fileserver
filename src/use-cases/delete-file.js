export default function makeDeleteFile({
  fileRepository,
}) {
  return async function deleteFile(req) {
    const { privateKey } = req.params;
    const response = await fileRepository.deleteOne(privateKey);

    return {
      deletedCount: response.deletedCount
    };
  }
}