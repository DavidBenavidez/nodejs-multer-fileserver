import multer from 'multer';
import path from 'path';
import { Router } from 'express';
import { filesController } from './controllers'
import { validations } from './middlewares';

const router = Router();
const filename = (_, file, callback) => {
  const timestamp = Date.now();

  file.timestamp = timestamp;
  callback(null, `${timestamp}-${file.originalname}`);
}

// Setup multer
const storage = multer.diskStorage({
  destination: process.env.FOLDER,
  filename,
});

const upload = multer({
  storage,
 });

// File consumers
router.get('/files/:publicKey', filesController.get);
router.get('/files', filesController.list);

// File owners
router.post('/files', [upload.single('sfile'), validations.validateUpload], filesController.create);
router.delete('/files/:privateKey', filesController.delete);

export default router;