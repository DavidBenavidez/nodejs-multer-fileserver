import { getBucket } from '../config/googleconnection';

/**
 * Makes the file repository by injecting
 * the database/model
 * @param {Object} param0 dependencies
 */
export default function makeGoogleFileRepository() {
  async function create(req){
    try {
      const bucket = await getBucket();
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on('error', err => {
        throw new Error(err);
      });

      blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        return {
          publicUrl,
        }
      });

      blobStream.end(req.file.buffer);
    } catch (error) {
      console.log('Error in creating file: ', error);
      throw new Error(error);
    }
  }

  // async function deleteOne(privateKey) {
  //   try {
  //     const response = await database.deleteOne({ privateKey });

  //     return response;
  //   } catch(error) {
  //     throw new Error(error)
  //   }
  // }

  // async function findOne(publicKey) {
  //   try {
  //     const response = await database.findOne({ publicKey });

  //     return response;
  //   } catch(error) {
  //     throw new Error(error)
  //   }
  // }

  // async function findAll() {
  //   try {
  //     const response = await database.find({});

  //     return response;
  //   } catch(error) {
  //     throw new Error(error)
  //   }
  // }

  return {
    create,
    // deleteOne,
    // findAll,
    // findOne,
  }
}