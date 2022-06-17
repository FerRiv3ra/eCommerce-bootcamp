import { Schema, model } from 'mongoose';

const ProductoSchema = new Schema({
  avalible: {
    type: Boolean,
    default: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true,
  },
  description: {
    type: String,
  },
  img: { type: String, default: '' },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, state, _id: uid, ...data } = this.toObject();
  return { uid, ...data };
};

export default model('Product', ProductoSchema);
