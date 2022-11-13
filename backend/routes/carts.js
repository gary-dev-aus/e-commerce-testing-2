const { Router } = require("express");
const cartsController = require("../controllers/carts");
const { requireAuth } = require("../middleware/auth");

const router = Router();

router.post("/", requireAuth, cartsController.createCart);
router.get("/:id", requireAuth, cartsController.getCart);
router.delete("/:id", requireAuth, cartsController.removeCart);
router.post("/:id/add", requireAuth, cartsController.addItem);

module.exports = router;
