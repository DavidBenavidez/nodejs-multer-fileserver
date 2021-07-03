import { iplookup } from '../helpers';
import { User } from '../models';
import { File } from '../models';

async function validateUpload(req, res, next) {
  try {
    // Get set upload limit from env
    const { env = {} } = process;
    const {
      UPLOAD_LIMIT,
    } = env;

    // Get user total upload data from db
    const ipObject = iplookup();
    const { en0: ipAddresses } = ipObject;
    const localIp = ipAddresses[0];
    const data = await User.findOne({localIP: localIp});
    const {
      uploadLimit,
    } = data;

    // Calculate final upload size
    // Users current uploadLimit + file size limit
    const finalUploadSize = +uploadLimit + +req.file.size;

    if(finalUploadSize >= +UPLOAD_LIMIT) {
      return res.status(400).jsonResponse(null, {
        error: 'Upload limit reached.',
      })
    }

    next();
  } catch (error) {
    console.log('Error in getting user bandwidth: ', error);
    return {
      error,
    }
  }
}

async function validateDownload(req, res, next) {
  try {
    // Get set download limit from env
    const { env = {} } = process;
    const {
      DOWNLOAD_LIMIT,
    } = env;

    // Get user total download data from db
    const ipObject = iplookup();
    const { en0: ipAddresses } = ipObject;
    const localIp = ipAddresses[0];
    const data = await User.findOne({localIP: localIp});
    const {
      downloadLimit,
    } = data;

    // Calculate final download size
    // Users current uploadLimit + file size limit
    const finalDownloadSize = +downloadLimit + +req.file.size;

    if(finalDownloadSize >= +DOWNLOAD_LIMIT) {
      return res.status(400).jsonResponse(null, {
        error: 'Download limit reached.',
      })
    }

    next();
  } catch (error) {
    console.log('Error in getting user bandwidth: ', error);
    return {
      error,
    }
  }
}

export default {
  validateDownload,
  validateUpload,
}