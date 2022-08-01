import {
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
  } from "@material-ui/core";
  
  import React from "react";
  import '../component/styles/editProduct.css' ;
  import { useState, useEffect } from "react";
  import Axios from "axios";
  import { blue } from "@material-ui/core/colors";
  import axios from "axios";
  import { useHistory } from "react-router-dom";
  
  export default function EditProduct(props) {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [measurement, setMeasurement] = useState("Kilograms");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("other");
    const [s_email, setS_email] = useState("");
    const [photo, setPhoto] = useState({});
    const [link, setLink] = useState("");
    let lk;
    const p_id = window.location.pathname.split("/")[2];
    useEffect(() => {
      //   const p_id = window.location.pathname.split('/')[2];
      //     console.log('pid', p_id);
  
      axios
        .get(`http://localhost:3001/getProductById/${p_id}`)
        .then((res) => {
          setTitle(res.data[0].title);
          setQuantity(res.data[0].quantity);
          setMeasurement(res.data[0].measurement);
          setPrice(res.data[0].price);
          setCategory(res.data[0].category);
          setS_email(res.data[0].s_email);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const checkUserInputs = () => {
      if (title == "" || quantity == 0 || price == "" || s_email == "") {
        alert("All items must be filled");
      } else if (quantity < 0 || price < 0) {
        alert("Quantuty/Price must be grater than 0");
      } else {
        let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      }
    };
    // ====================
  
    const updateProduct = () => {
      axios
        .put(`http://localhost:3001/updateProduct/${p_id}`, {
          title: title,
          quantity: quantity,
          measurement: measurement,
          price: price,
          category: category,
          s_email: s_email,
        })
        .then(() => {
          //alert("Edit your product Successfully");
          history.push("/viewProducts");
        });
    };
  
    return (
      <div>
       
          <h1 className='title'>Edit Product</h1>
      <div className='list7'>
  
          <Card
            style={{
              maxWidth: 450,
              padding: "20px 5px",
              margin: "0 auto",
              backgroundColor: "#ebebeb",
            }}
          >
            <div className='information'>
              {/* <label>Title </label> */}
              <input
                placeholder='Title'
                type='text'
                value={title}
                required
                onChange={(event) => setTitle(event.target.value)}
              />
  
              {/* <label>Quantity</label> */}
              <input
                type='number'
                placeholder='Quantity'
                value={quantity}
                required
                onChange={(event) => setQuantity(event.target.value)}
              />
              {/* <label>Measurement</label> */}
              <select
                value={measurement}
                onChange={(event) => setMeasurement(event.target.value)}
              >
                <option value=''>Select Measurement</option>
                <option value='Kilograms'>Kilograms</option>
                <option value='grams'>grams</option>
                <option value='Liter'>Liter</option>
                <option value='items'>Items</option>
              </select>
  
              {/* <label>Price for one unit</label> */}
              <input
                placeholder='Price for one unit'
                type='text'
                value={price}
                required
                onChange={(event) => setPrice(event.target.value)}
              />
  
              {/* <label>Category</label> */}
  
              <select
                size='lg'
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value=''>Select Category</option>
                <option value='other'>Other</option>
                <option value='fruit'>Fruit</option>
                <option value='veg'>Vegetable</option>
                <option value='bakery'>Bakery</option>
              </select>
  
              <input
                type='email'
                required
                value={s_email}
                onChange={(event) => setS_email(event.target.value)}
                placeholder='Enter your email'
              />
  
              <Button
                style={{
                  width: "55%",
                  padding: "1px 20px",
                  color: "black",
                  fontSize: "18px",
                  border: "2px solid",
                }}
                onClick={updateProduct}
              >
                {" "}
                Edit Product{" "}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }
  
  
  
  