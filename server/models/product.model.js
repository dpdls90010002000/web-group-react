import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required',
    trim: true,
  },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String
  },
  quantity: {
    type: Number,
    required: "Quantity is required",
  },
  // size: {
  //   type : Number,
  //   required: true,
  //   trim: true
  // },
  // color: {
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  price: {
    type: Number,
    required: "Price is required",
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  shop: {type: mongoose.Schema.ObjectId, ref: 'Shop'}
});

export default mongoose.model('Product', productSchema);
