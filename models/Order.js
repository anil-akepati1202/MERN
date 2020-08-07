const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  order_id: {
    type: Number,
    required: true,
    unique: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  products: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
      },
      description: {
        type: String,
      },
      image: {
        type: String,
      },
      qty: {
        type: Number,
      },
    },
  ],
  totalPrice: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
  },
  paymentType: {
    type: String,
  },
  orderStatus: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("order", OrderSchema);
