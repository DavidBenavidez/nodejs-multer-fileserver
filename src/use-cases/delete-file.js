/**
 * Makes the delete file usecase
 * @param {Object} param0 dependencies
 */
export default function makeDeleteFile({
  fileRepository,
  helpers,
}) {
  return async function deleteFile(req) {
    const { privateKey } = req.params;
    const localIp = helpers.localIpLookup();
    const key = `${privateKey}-${localIp}`;
    const { deletedCount } = await fileRepository.deleteOne(key);

    if (deletedCount < 1) {
      return {
        error: 'You do not have permission to delete this file.',
      }
    }
    return {
      deletedCount,
    };
  }
}