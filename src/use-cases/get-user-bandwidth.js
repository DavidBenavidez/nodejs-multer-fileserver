import { iplookup } from '../helpers';

export default function makeGetUserBandwidth() {
  return async function getUserBandwidth() {
    const { publicKey } = req.params;
    // Get file using publickey here

    return {
      stream: 'asdfasdfasdfasdlfkasjdfkl ajsd;flkaj sd;lfkjas ;lkdfjas;lkfdj;lk'
    };
  }
}