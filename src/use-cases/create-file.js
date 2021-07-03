import {
  getDocumentExpireTime,
  localIpLookup,
 } from '../helpers';

export default function makeCreateFile({
  fileRepository,
  userRepository,
}) {
  return async function createFile(req) {

    try {
      const localIp = localIpLookup();
      const expiresAt = getDocumentExpireTime();
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