const pool = require("../config/db");

exports.getProducts = async (req, res) => {
  const result = await pool.query("SELECT * FROM products");
  res.json(result.rows);
};

exports.createProduct = async (req, res) => {
  const { name, price, image, description } = req.body;

  const result = await pool.query(
    "INSERT INTO products(name,price,image,description) VALUES($1,$2,$3,$4) RETURNING *",
    [name, price, image, description]
  );

  res.json(result.rows[0]);
};