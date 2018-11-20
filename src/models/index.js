import mongoose from 'mongoose';
import UserModel from './userModel.js';

// const config = require('../../config');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/geelBase', { useNewUrlParser: true });

export { UserModel };
