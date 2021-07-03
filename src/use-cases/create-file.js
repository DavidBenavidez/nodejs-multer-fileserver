/**
 * Makes the createFile usecases
 * @param {Object} param0 dependencies
 */
export default function makeCreateFile({
  fileRepository,
  userRepository,
  googleFileRepository,
  helpers,
}) {
  return async function createFile(req) {
    try {
      const localIp = helpers.localIpLookup();
      const expiresAt = helpers.getDocumentExpireTime();
      const {
        file,
        file: {
          size,
        }
      } = req;

      const newFile = await fileRepository.create(file, {
        localIp,
        expiresAt,
      });

      await userRepository.updateOne(localIp, {
        size,
      })

      console.log('Successfully created new file: ', newFile);

      return {
        publicKey: req.file.timestamp,
        privateKey: localIp,
      };
    } catch (error) {
      console.log('Error in creating new file');
      console.log(error);
      return {
        error,
      };
    }
  }
}