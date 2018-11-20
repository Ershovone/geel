import mongoose, { Schema } from 'mongoose';

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const UserModel = mongoose.model('User', User);

export default UserModel;
