import {
  File,
  User,
} from '../models'
import makeFileRepository from './file-repository.js';
import makeUserRepository from './user-repository.js';
import makeGoogleFileRepository from './google-file-repository.js';

export const fileRepository = makeFileRepository({
  database: File
});

export const userRepository = makeUserRepository({
  database: User
});

export const googleFileRepository = makeGoogleFileRepository();