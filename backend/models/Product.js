const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A name is required"],
      lowercase: true,
      unique: true,
    },
    price: {
      type: Number,
      cast: "{VALUE} is not a valid number",
      min: [0, "Price must be greater than 0"],
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("product", productSchema);

module.exports = Product;
