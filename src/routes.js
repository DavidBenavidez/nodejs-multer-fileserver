import multer from 'multer';
import path from 'path';
import { Router } from 'express';
import { filesController } from './controllers'

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

// File owners
router.get('/', function(_, res){
  console.log(`path.resolve(__dirname, '../public')`);
  console.log(path.resolve(__dirname, '../public'));
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

router.post('/files', [upload.single('sfile')], filesController.create);
router.delete('/files/:privateKey', filesController.delete);

// File consumers
router.get('/files/:publicKey', filesController.get);
// router.get('/files', filesController.list);

// Update User bandwidths
// router.use();
export default router;