import mongoose, { Schema } from 'mongoose';

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  text: { type: String, required: false }
});

const UserModel = mongoose.model('User', User);

export default UserModel;
