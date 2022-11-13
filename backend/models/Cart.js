const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const itemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Product ID is required"],
    ref: "product",
    unique: [true, "Cart can only have one line item of each product"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    // min: 1,
    min: [1, "Quantity must be greater than 0"],
  },
});

const cartSchema = new mongoose.Schema(
  {
    items: {
      required: [true, "An items array is required"],
      type: [itemSchema],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: [true, "User can only have one cart"],
    },
  },
  { timestamps: true }
);

cartSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
