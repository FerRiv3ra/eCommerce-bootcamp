import { Schema, model } from 'mongoose';
import generateToken from '../helpers/generateToken';

const userSchema = new Schema({
  confirm: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: [true, 'The email is required'],
    unique: true,
    lowercase: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  img: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'The name is required'],
  },
  password: {
    type: String,
    required: [true, 'The password is required'],
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE',
  },
  state: {
    type: Boolean,
    default: true,
  },
  shopping_cart: {
    type: Array,
    default: [],
  },
  token: {
    type: String,
    default: generateToken(),
  },
});

userSchema.methods.toJSON = function () {
  const { __v, _id: uid, ...user } = this.toObject();
  return { uid, ...user };
};

export default model('User', userSchema);
