import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  analyses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Analysis',
  }],
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
