import { Schema, model } from 'mongoose';

const roleSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
});

export default model('Role', roleSchema);
