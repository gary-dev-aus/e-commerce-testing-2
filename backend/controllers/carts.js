require("dotenv").config();
const Cart = require("../models/Cart");
const { handleErrors } = require("../functions/handleErrors");
const { getUserId } = require("../functions/getUserId");

// for testing
const deleteCarts = () => {
  Cart.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("All carts deleted");
    }
  });
};

module.exports.createCart = async (req, res) => {
  const { items } = req.body;

  const userId = await Promise.resolve(
    getUserId(req.header("Authorization")?.replace("Bearer ", ""))
  );

  try {
    const cart = await Cart.create({ items, user: userId });
    res.status(201).json({
      cart: {
        id: cart._id,
        items: cart.items,
        user: cart.user,
      },
    });
    console.log("New cart created:", cart);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

  // deleteCarts();
};

module.exports.removeCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findByIdAndDelete(id);
    if (!cart) {
      res.status(404).json({ errors: [{ message: "Cart not found" }] });
    } else {
      res.status(200).json({
        cart: {
          id: cart._id,
          items: cart.items,
          user: cart.user,
        },
      });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.getCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findById(id);
    if (!cart) {
      res.status(404).json({ errors: [{ message: "Cart not found" }] });
    } else {
      res.status(200).json({
        cart: {
          id: cart._id,
          items: cart.items,
          user: cart.user,
        },
      });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.addItem = async (req, res) => {
  const { id } = req.params;
  const { item } = req.body;

  try {
    const cart = await Cart.findById(id);
    console.log(cart, item);
    if (!cart) {
      res.status(404).json({ errors: [{ message: "Cart not found" }] });
    } else {
      cart.items.push(item);
      await cart.save();
      res.status(200).json({
        cart: {
          id: cart._id,
          items: cart.items,
          user: cart.user,
        },
        item: {
          id: item._id,
          title: item.title,
          price: item.price,
        },
      });
    }
    // const cart = await Cart.findByIdAndUpdate(
    //   id,
    //   { $push: { items: item } },
    //   { new: true, runValidators: true }
    // );
    // console.log(cart);
    // if (!cart) {
    //   res.status(404).json({ errors: [{ message: "Cart not found" }] });
    // } else {
    //   res.status(200).json({
    //     cart: {
    //       id: cart._id,
    //       items: cart.items,
    //       user: cart.user,
    //     },
    //     item: {
    //       id: item.product,
    //       quantity: item.quantity,
    //     },
    //   });
    //   console.log("Item added to cart:", item);
    // }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
