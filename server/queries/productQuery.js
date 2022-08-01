const express = require("express");
const mariadb = require("mariadb");
const cors = require("cors");
const bodyParser = require("body-parser");
const upload = require("express-fileupload");
const productQuery = express.Router();

const db = mariadb.createPool({
    user: "root",
    host: "localhost",
    password: "****",
    database: "****",
  });
// ======================= add new product ==============================================
productQuery.post("/new", async (req, res) => {
  // console.log(req.file);

  const URL = req.body.link;
  const title = req.body.title;
  console.log("title:" + title);
  const quantity = req.body.quantity;
  const measurement = req.body.measurement;
  const price = req.body.price;
  const category = req.body.category;
  const s_email = req.body.s_email;

  if (
    title == null ||
    quantity == null ||
    price == null ||
    s_email == null ||
    URL == null
  ) {
    console.log("can't be empty");
  }

  try {
    const result = await db.query(
      "INSERT INTO products (title, quantity, measurement , price,category,s_email,url) VALUES(?,?,?,?,?,?,?)",
      [title, quantity, measurement, price, category, s_email, URL]
    );
    res.send("data inserted");
  } catch (err) {
    throw err;
  }
});

// ======================== get all products =============================================
productQuery.get("/productsBySeller/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const result = await db.query("SELECT * FROM products where s_email =?", [
      email,
    ]);
    if (result == null) {
      res.send("No data");
    } else {
      res.send(result);
    }
  } catch (err) {
    throw err;
  }
});

// ============================= get product by category ===============================
productQuery.get("/productsBySeller/:email/:category", async (req, res) => {
  if (req.params.email == "" || req.params.category == null) {
    res.send("invalid request");
  } else {
    const email = req.params.email;
    const category = req.params.category;

    try {
      const result = await db.query(
        "SELECT * FROM products WHERE category = ? AND s_email = ?",
        [category, email]
      );
      res.send(result);
      // if( result.length == 0){
      //     res.send("No data");
      // }else{
      //     res.send(result );
      // }
    } catch (err) {
      throw err;
    }
  }
});

// ============================= get product by id ===============================
productQuery.get("/getProductById/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query("SELECT * FROM products WHERE p_id = ?", [
      id,
    ]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

productQuery.put("/updateProduct/(:id)", async (req, res) => {
  // console.log(req.file);
  console.log(req.body);
  const id = req.params.id;
  const title = req.body.title;
  const quantity = req.body.quantity;
  const measurement = req.body.measurement;
  const price = req.body.price;
  const category = req.body.category;
  const s_email = req.body.s_email;

  try {
    const result = await db.query(
      "UPDATE products SET title = ? , quantity = ?, measurement = ? , price = ?,category = ?,s_email = ? WHERE p_id = ?",
      [title, quantity, measurement, price, category, s_email, id]
    );
    console.log("result", result);

    res.send("data inserted");
  } catch (err) {
    throw err;
  }
});
// // =======================Delete a Product ======================================

productQuery.delete("/del_product/:id", async (req, res) => {
  console.log("maria Db");
  const id = req.params.id;
  const query = "DELETE FROM products WHERE p_id = ?";

  try {
    const result = await db.query(query, [id]);
    res.send("Item Deleted");
  } catch (err) {
    throw err;
  }
});

module.exports = productQuery;


