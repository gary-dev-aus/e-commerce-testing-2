const { Router } = require("express");
const productsController = require("../controllers/products");
const { requireAuth } = require("../middleware/auth");

const router = Router();

router.post("/", requireAuth, productsController.createProduct);
router.get("/", requireAuth, productsController.listProducts);
router.get("/:id", requireAuth, productsController.getProduct);
router.post("/:id", requireAuth, productsController.updateProduct);
router.delete("/:id", requireAuth, productsController.deleteProduct);

module.exports = router;
