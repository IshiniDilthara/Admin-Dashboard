const express = require("express");
const mariadb = require("mariadb");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const upload = require("express-fileupload");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(upload());
app.use(express.static("./public"));
const seller=require('./queries/seller.js');
const customer = require("./queries/customer.js");
const admin = require("./queries/admin.js");
const productQuery = require("./queries/productQuery.js");
app.use(seller)
app.use(customer)
app.use(admin)
app.use(productQuery)


app.listen(3001, () => {
  console.log("Server is running");
});