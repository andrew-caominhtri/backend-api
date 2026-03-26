const router = require("express").Router();
const auth = require("../middleware/auth");
const { createOrder, getOrders } = require("../controllers/orderController");

router.post("/", auth, createOrder);
router.get("/:userId", auth, getOrders);

module.exports = router;