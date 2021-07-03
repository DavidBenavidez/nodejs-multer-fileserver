/**
 * Makes the user repository by
 * injecting the database
 * @param {Object} param0 dependencies
 */
export default function makeUserRepository({ database }) {
  async function updateOne(localIp, options = {}){
    const { size } = options;
    try {
      await database.collection.updateOne(
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
    } catch (error) {
      console.log('Error in updating user bandwidth: ', error);
      throw new Error(error);
    }
  }

  async function findOne(localIp){
    try {
      const response = await database.findOne({ localIP: localIp });

      return response;
    } catch (error) {
      console.log('Error in updating user bandwidth: ', error);
      throw new Error(error);
    }
  }

  return {
    findOne,
    updateOne,
  }
}