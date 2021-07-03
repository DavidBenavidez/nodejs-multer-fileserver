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

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../public/files'),
  filename,
});

const upload = multer({
  storage,
  // fileFilter,
 });

 router.get('/', function(_, res){
   res.sendFile(path.resolve(__dirname, '../public/index.html'));
  });

// File consumers
router.get('/files/:publicKey', filesController.get);
router.get('/files', filesController.list);

// File owners
router.post('/files', [upload.single('sfile'), validations.validateUpload], filesController.create);
router.delete('/files/:privateKey', filesController.delete);


export default router;