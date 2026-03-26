const pool = require("../config/db");

exports.createOrder = async (req, res) => {
  const { user_id, items } = req.body;

  const order = await pool.query(
    "INSERT INTO orders(user_id,total_price) VALUES($1,0) RETURNING *",
    [user_id]
  );

  let total = 0;

  for (let item of items) {
    const product = await pool.query(
      "SELECT * FROM products WHERE id=$1",
      [item.product_id]
    );

    const price = product.rows[0].price;
    total += price * item.quantity;

    await pool.query(
      "INSERT INTO order_items(order_id,product_id,quantity) VALUES($1,$2,$3)",
      [order.rows[0].id, item.product_id, item.quantity]
    );
  }

  await pool.query(
    "UPDATE orders SET total_price=$1 WHERE id=$2",
    [total, order.rows[0].id]
  );

  res.json({ message: "Order created", total });
};

exports.getOrders = async (req, res) => {
  const userId = req.params.userId;

  const result = await pool.query(
    "SELECT * FROM orders WHERE user_id=$1",
    [userId]
  );

  res.json(result.rows);
};