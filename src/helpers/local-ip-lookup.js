// https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js

const { networkInterfaces } = require('os');

/**
 * Gets the local ip of a user
 *
 * Current implementation uses local ip
 * as I thought it's most logical for
 * a local file sharing server
 * @returns string
 */
export default function localIpLookup() {
  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
          // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
          if (net.family === 'IPv4' && !net.internal) {
              if (!results[name]) {
                  results[name] = [];
              }
              results[name].push(net.address);
          }
      }
  }
  const { en0: ipAddresses } = results;
  const localIp = ipAddresses[0];

  return localIp;
}