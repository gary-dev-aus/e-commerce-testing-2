const Product = require("../models/Product");
const { handleErrors } = require("../functions/handleErrors");

module.exports.createProduct = async (req, res) => {
  const { price, title } = req.body;

  try {
    const product = await Product.create({ title, price });
    res.status(201).json({
      product: {
        id: product._id,
        title: product.title,
        price: product.price,
      },
    });
    console.log("New product created:", title);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ errors: [{ message: "Product not found" }] });
    } else {
      res.status(200).json({
        product: {
          id: product._id,
          title: product.title,
          price: product.price,
        },
      });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.listProducts = async (req, res) => {
  try {
    const productsData = await Product.find();
    const products = productsData.map((product) => {
      return {
        id: product._id,
        title: product.title,
        price: product.price,
      };
    });
    res.status(200).json({
      products,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { title, price } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { title, price },
      { returnDocument: "after", runValidators: true }
    );
    if (!product) {
      res.status(404).json({ errors: [{ message: "Product not found" }] });
    } else {
      res.status(200).json({
        product: {
          id: product._id,
          title: product.title,
          price: product.price,
        },
      });
      console.log("Product updated:", product.title, product.price);
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ errors: [{ message: "Product not found" }] });
    } else {
      res.status(200).json({
        product: {
          id: product._id,
          title: product.title,
          price: product.price,
        },
      });
      console.log("Product deleted:", product.title);
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
