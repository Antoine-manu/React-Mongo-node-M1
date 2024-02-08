const mongoose = require('mongoose');
const { Schema } = mongoose;

const productList = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 1 }
});

const List = new Schema({
  products: [productList],
  userid: {type: String, ref: "User"}
});

module.exports = mongoose.model("List",List);