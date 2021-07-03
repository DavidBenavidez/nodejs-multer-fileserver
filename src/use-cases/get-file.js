/**
 * Makes the download file use case
 * @param {Object} param0 dependencies
 */
export default function makeGetFile({
  helpers,
  fileRepository,
  userRepository,
 }) {
  return async function getFile(req) {
    const { publicKey } = req.params;
    const file = await fileRepository.findOne(publicKey);
    const user = await userRepository.findOne(helpers.localIpLookup());

    // Get set download limit from env
    const { env = {} } = process;
    const {
      DOWNLOAD_LIMIT = 100000,
    } = env;

    // Get user total download data from db
    const {
      downloadLimit,
    } = user;

    // Calculate final download size
    // Users current downloadLimit + file size limit
    const finalDownloadSize = +downloadLimit + +file.size;

    if(finalDownloadSize >= +DOWNLOAD_LIMIT) {
      return {
        error: 'User download limit reached',
      }
    }

    return file;
  }
}