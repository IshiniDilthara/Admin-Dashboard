import { Button, Card } from "@material-ui/core";
import React from "react";
import "../component/styles/addProduct.css";
import "../component/styles/notifi.css";
import { useState } from "react";
import Axios from "axios";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [measurement, setMeasurement] = useState("Kilograms");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("other");
  const [s_email, setS_email] = useState("");
  const [photo, setPhoto] = useState({});
  const [link, setLink] = useState("");
  let lk;

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", "jpznaoxj");

    Axios.post(
      "https://api.cloudinary.com/v1_1/trsghjjjjj/image/upload",
      formData
    ).then((reponse) => {
      // setLink(reponse['data']['secure_url']);

      lk = reponse["data"]["secure_url"];
    });

    console.log("image added");
  };

  const checkUserInputs = () => {
    if (title == "" || quantity == 0 || price == "" || s_email == "") {
      showNotification("All items must be filled");
    } else if (quantity < 0 || price < 0) {
      //alert("Quantuty/Price must be grater than 0");
      showNotification("Quantuty/Price must be grater than 0");
    } else {
      let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      console.log(s_email);
      if (regex.test(s_email)) {
        uploadImage();

        setTimeout(sendProduct, 2000);
      } else {
        //alert("You have entered an invalid email address!");
        showNotification("You have entered an invalid email address!");
      }
    }
  };

  const sendProduct = () => {
    Axios.post("http://localhost:3001/new", {
      title: title,
      quantity: quantity,
      measurement: measurement,
      price: price,
      category: category,
      s_email: s_email,
      link: lk,
    }).then(() => {
      alert("Item Added");
      window.location.reload(false);
    });
  };
  const mailValide = () => {
    if (s_email == "") {
      //alert("Please Enter Your email");
      showNotification("Please Enter Your email");
    } else {
      let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      console.log(s_email);
      if (!regex.test(s_email)) {
        alert("You have entered an invalid email address!");
      }
    }
  };

  return (
    <div>
      <h1 className='title'>Add Product</h1>
      <div className='list6'>
        <Card
          style={{
            maxWidth: 450,
            padding: "20px 5px",
            margin: "0 auto",
            backgroundColor: "#ebebeb",
          }}
        >
          <div id='note'>notifi msg</div>
          <div className='information'>
            <input
              placeholder='Title'
              type='text'
              required
              onChange={(event) => setTitle(event.target.value)}
            />

            <input
              type='number'
              placeholder='Quantity'
              required
              onChange={(event) => setQuantity(event.target.value)}
            />

            <select onChange={(event) => setMeasurement(event.target.value)}>
              <option value=''>Select Measurement</option>
              <option value='Kilograms'>Kilograms</option>
              <option value='grams'>grams</option>
              <option value='Liter'>Liter</option>
              <option value='items'>Items</option>
            </select>

            <input
              placeholder='Price for one unit'
              type='text'
              required
              onChange={(event) => setPrice(event.target.value)}
            />

            <select
              size='lg'
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value=''>Select Category</option>
              <option value='other'>Other</option>
              <option value='fruit'>Fruit</option>
              <option value='veg'>Vegetable</option>
              <option value='bakery'>Bakery</option>
            </select>

            <input
              type='file'
              required
              onChange={(event) => {
                setPhoto(event.target.files[0]);
              }}
            />

            <label>To add your Product please enter your seller email</label>

            <input
              type='email'
              required
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
              onClick={checkUserInputs}
            >
              Add Product
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function showNotification(msg) {
  var note = document.getElementById("note");
  note.innerHTML = msg;
  note.style.display = "block";
  setTimeout(function() {
    document.getElementById("note").style.display = "none";
  }, 3000);
}
