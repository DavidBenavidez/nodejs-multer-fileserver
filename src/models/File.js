import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: [
      true,
    ],
  },
  filename: {
    type: String,
    required: [
      true,
      'Uploaded file must have a name',
    ]
  },
  size: {
    type: Number,
  },
  originalname: {
    type: String,
  },
  publicKey: {
    type: String,
    required: [
      true,
    ],
  },
  privateKey: {
    type: String,
    required: [
      true,
    ],
  },
});

FileSchema.index({
    expiresAt: 1,
  },
  {
    expireAfterSeconds: 0,
  },
);

const File = mongoose.model('File', FileSchema);

export default File;