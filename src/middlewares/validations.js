import { localIpLookup } from '../helpers';
import { User } from '../models';

/**
 * Middleware for checking if user
 * has reached upload limit.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
async function validateUpload(req, res, next) {
  try {
    // Get set upload limit from env
    const { env = {} } = process;
    const {
      UPLOAD_LIMIT,
    } = env;

    // Get user total upload data from db
    const localIp = localIpLookup();
    const data = await User.findOne({localIP: localIp});
    const {
      uploadLimit,
    } = data;

    // Calculate final upload size
    // Users current uploadLimit + file size limit
    const finalUploadSize = +uploadLimit + +req.file?.size;

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

export default {
  validateUpload,
}