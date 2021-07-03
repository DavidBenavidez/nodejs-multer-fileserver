import {
  File,
  User,
} from '../models'
import makeFileRepository from './file-repository.js';
import makeUserRepository from './user-repository.js';

export const fileRepository = makeFileRepository({
  database: File
});

export const userRepository = makeUserRepository({
  database: User
});