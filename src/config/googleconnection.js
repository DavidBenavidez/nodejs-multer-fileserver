import fs from 'fs';
import { Storage } from '@google-cloud/storage';

const { env = {}} = process;
const {
  CONFIG = ''
} = env;

if (!CONFIG)  {
  throw new Error('Google cloud config not found');
}

const gcConfig = JSON.parse(fs.readFileSync(CONFIG, 'utf8'));

/**
 * the FIRST bucket is always used for this project
 * to prevent hard coded configs.
 */
export const getBucket = async () => {
  const gc = new Storage({
    keyFilename: CONFIG,
    projectId: gcConfig.project_id,
  });
  const buckets = await gc.getBuckets();

  return buckets[0];
}