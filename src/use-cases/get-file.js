export default function makeGetFile() {
  return async function getFile(req) {
    const { publicKey } = req.params;
    // Get file using publickey here

    return {
      stream: 'asdfasdfasdfasdlfkasjdfkl ajsd;flkaj sd;lfkjas ;lkdfjas;lkfdj;lk'
    };
  }
}