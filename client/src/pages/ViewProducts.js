import React from "react";
import "../component/styles/viewProduct.css";
import { useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";

function ViewProducts() {
  const history = useHistory();
  const [category, setCategory] = useState("other");
  const [s_email, setS_email] = useState("");
  // const [p_id, setP_id] = useState("0");
  const [productList, setProductList] = useState([]);

  const recieveProduct = () => {
    if (s_email == "") {
      return ["Must match password"];
    } else {
      let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      console.log(s_email);
      if (!regex.test(s_email)) {
        alert("You have entered an invalid email address!");
      }
    }
    Axios.get("http://localhost:3001/productsBySeller/" + s_email).then(
      (products) => {
        console.log("products ", products);
        setProductList(products.data);
      }
    );
  };

  const handleDelete = (id) => {
    console.log("log" + id);
    deleteProduct(id);
    alert("Item Deleted");
    window.location.reload(false);
  };

  const deleteProduct = (p_id) => {
    console.log("harry Potter");
    Axios.delete("http://localhost:3001/del_product/" + p_id).then(() => {
      console.log("harry Potter");
    });
  };

  const recieveProductByCategory = () => {
    if (s_email == "") {
      alert("Please Enter Your email");
    }
    Axios.get(
      "http://localhost:5000/productsBySeller/" + s_email + "/" + category
    ).then((products) => {
      if (products.data.length == 0) {
        alert("No Data");
      }
      setProductList(products.data);
    });
  };

  return (
    <div>
      <h1 className='title'> View Produts </h1>

      <div className='productList1'>
        <Card
          style={{
           
            maxWidth: 450,
            padding: "20px 5px",
            margin: "0 auto",
            backgroundColor: "#ebebeb",
          }}
        >
          <label style={{marginLeft:"32%", fontWeight:"bold",fontFamily:"sans-serif"}}>Enter Your email</label>
          <input
            style={{
             
              width: "75%",
              padding: "5px 20px",
              color: "black",
              fontSize: "18px",
              border: "2px solid",
              marginLeft:"10%"
            }}
            type='text'
            onChange={(event) => setS_email(event.target.value)}
            placeholder='Enter your email'
          />
          <br />
          <Button
            style={{
              width: "85%",
              padding: "1px 20px",
              color: "black",
              fontSize: "18px",
              border: "2px solid",
              marginLeft:"10%"
            }}
            onClick={recieveProduct}
          >
            {" "}
            Check all Produts
          </Button>
          <br />
          <br />
          <label style={{marginLeft:"40%", fontWeight:"bold", fontFamily:"sans-serif"}}>Category</label>

          <select
            style={{
              width: "85%",
              padding: "1px 20px",
              color: "black",
              fontSize: "18px",
              border: "2px solid",
              marginLeft:"10%"
            }}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value='other'>Other</option>
            <option value='fruit'>Fruit</option>
            <option value='veg'>Vegetable</option>
            <option value='bakery'>Bakery</option>
          </select>
          <br />
          <Button
            style={{
              width: "85%",
              padding: "1px 20px",
              color: "black",
              fontSize: "18px",
              border: "2px solid",
              marginLeft:"10%"
            }}
            onClick={recieveProductByCategory}
          >
            {" "}
            Check Produts By Category
          </Button>
        </Card>
      </div>

      <div className='grid'>
        {productList.map((val, key) => {
          return (
            <Card>
              <div className='setInVar'>
                <Card
                  style={{
                   
                    backgroundColor: "#e6f3ff",
                  }}
                >
                  <img style={{ width: 250, height: 200 }} src={val.url} />
                </Card>
                <br />
                <Card>
                  <span> TITLE :</span> {val.title}
                  <br />
                  <span>PRICE : </span> {val.price}
                  <br />
                  <span>Quantity : </span> {val.quantity}
                  {val.measurement}
                  <br />
                  <span>CATEGORY : </span> {val.category}
                </Card>
                <br />
                <Button
                  style={{
                    width: "55%",
                    padding: "1px 20px",
                    color: "black",
                    fontSize: "18px",
                    border: "2px solid",
                  }}
                  onClick={() => handleDelete(val.p_id)}
                >
                  DELETE
                </Button>
                <br />
                <br />
                <Button
                  onClick={() => history.push(`/editProduct/${val.p_id}`)}
                  type='submit'
                  style={{
                    width: "55%",
                    padding: "2px 20px",
                    color: "black",
                    fontSize: "18px",
                    border: "2px solid",
                  }}
                >
                  Update
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
export default ViewProducts;
