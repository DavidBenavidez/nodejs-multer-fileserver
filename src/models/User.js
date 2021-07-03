import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  localIP: {
    type: String,
  },
  downloadLimit: {
    type: Number,
    default: 0,
  },
  uploadLimit: {
    type: Number,
    default: 0,
  }
});

const User = mongoose.model('User', UserSchema);

export default User;