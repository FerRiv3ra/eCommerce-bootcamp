import { Schema, model } from 'mongoose';

const categoriaSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

categoriaSchema.methods.toJSON = function () {
  const { __v, state, _id: uid, ...data } = this.toObject();
  return { uid, ...data };
};

export default model('Categoria', categoriaSchema);
