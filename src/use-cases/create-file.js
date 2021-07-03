import { File } from '../models';
import { User } from '../models';
import { iplookup } from '../helpers';

export default function makeCreateFile() {
  return async function createFile(req) {
    const ipObject = iplookup();
    const { en0: ipAddresses } = ipObject;
    const localIp = ipAddresses[0];

    const {
      filename,
      originalname,
      timestamp,
      size,
    } = req.file;
    try {
      const { env = {} } = process;
      const {
        CLEAN_UP_TIME_SECONDS = 86400,
       } = env;
      const cleanTime = +CLEAN_UP_TIME_SECONDS;
      const dateNow = new Date();
      const expiresAt = dateNow
      .setSeconds(dateNow.getSeconds() + cleanTime);

      const newFile = await File.create({
        expiresAt,
        filename,
        originalname,
        publicKey: timestamp,
        privateKey: `${timestamp}-${localIp}`,
        size,
      });

      console.log('Successfully created new file: ', newFile);

      await User.collection.updateOne(
        { localIP: localIp },
        {
          $set: {
            localIP: localIp,
          },
          $inc: {
            downloadLimit: +size,
            uploadLimit: +size,
          }
        },
        { upsert: true },
      );

      return {
        publicKey: timestamp,
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