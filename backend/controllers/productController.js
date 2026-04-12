const pool = require("../config/db");

exports.getProducts = async (req, res) => {
  const result = await pool.query("SELECT * FROM products");
  res.json(result.rows);
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query("SELECT * FROM products WHERE id=$1", [id]);

  res.json(result.rows[0]);
};

exports.createProduct = async (req, res) => {
  const { name, price, description, category, brand } = req.body;

  const image = req.file ? req.file.filename : null;

  const result = await pool.query(
    "INSERT INTO products(name,price,image,description,category,brand) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
    [name, price, image, description, category || null, brand || null]
  );

  res.json(result.rows[0]);
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, brand } = req.body;

  const image = req.file ? req.file.filename : req.body.image;

  await pool.query(
    "UPDATE products SET name=$1,price=$2,image=$3,description=$4,category=$5,brand=$6 WHERE id=$7",
    [name, price, image, description, category || null, brand || null, id]
  );

  res.json({ message: "Updated" });
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM products WHERE id=$1", [id]);

  res.json({ message: "Deleted" });
};
