const { Router } = require("express");
const usersController = require("../controllers/users");
const { requireAuth } = require("../middleware/auth");

const router = Router();

router.post("/", usersController.registerUser);
router.get("/me", requireAuth, usersController.getMe);

module.exports = router;
