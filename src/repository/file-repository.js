/**
 * Makes the file repository by injecting
 * the database/model
 * @param {Object} param0 dependencies
 */
export default function makeFileRepository({ database }) {
  async function create(file, options = {}){
    try {
      const {
        filename,
        originalname,
        timestamp,
        size,
      } = file;
      const {
        localIp,
        expiresAt,
      } = options;

      const newFile = await database.create({
        expiresAt,
        filename,
        originalname,
        publicKey: timestamp,
        privateKey: `${timestamp}-${localIp}`,
        size,
      });

      return newFile;
    } catch (error) {
      console.log('Error in creating file: ', error);
      throw new Error(error);
    }
  }

  async function deleteOne(privateKey) {
    try {
      const response = await database.deleteOne({ privateKey });

      return response;
    } catch(error) {
      throw new Error(error)
    }
  }

  async function findOne(publicKey) {
    try {
      const response = await database.findOne({ publicKey });

      return response;
    } catch(error) {
      throw new Error(error)
    }
  }

  async function findAll() {
    try {
      const response = await database.find({});

      return response;
    } catch(error) {
      throw new Error(error)
    }
  }


  return {
    create,
    deleteOne,
    findAll,
    findOne,
  }
}