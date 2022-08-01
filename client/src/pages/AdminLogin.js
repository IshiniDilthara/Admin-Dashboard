import React, { useState} from "react";
//import { Link } from "react-router-dom";
import Axios from "axios";
//import { Redirect } from 'react-router';
import '../component/styles/st.css'
import Button from '@material-ui/core/Button';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";

const AdminLogin = ()=>{
  ///const[emailSeller, setEmailSeller]=useState("");
  //const[passwordSeller, setPasswordSeller]=useState("");

  //const[sellerLoginState,setSellerLoginState]=useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  
     
      const handleLogin = (values) => {
        Axios.post("http://localhost:3001/loginAdmin", {
          email: values.email,
          password: values.password,
        }).then((response) => {
          if(response.data.msg==="user logged"){
            alert(response.data.msg);
            window.location = '/ViewUsers/';
          }
          else{
          alert(response.data.msg);
          }
          
        });
      };
      const validationsLogin = yup.object().shape({
        email: yup
          .string()
          .email("invalid email")
          .required("Email is mandatory"),
        password: yup
          .string()
          .min(8, "Password must be at least 8 characters long")
          .required("Password is mandatory"),
      });
    
     
   return (
    <div>
   <div className="page">
      <h1 style={{ marginLeft:510,fontWeight:"bolder",fontSize:40,marginBottom:5, fontFamily:"sans-serif",fontSize:50}}>Admin Login</h1>
        <br/>
      <div className="container">
    <Formik
      initialValues={{}}
      onSubmit={handleLogin}
      validationSchema={validationsLogin}
      
    >
      <Form className="login-form">
        <div className="login-form-group">
          <Field name="email" className="form-field" placeholder="Email" required />

          <ErrorMessage
            component="span"
            name="email"
            className="form-error"
          />
        </div>
        {/*Outro campo*/}
        <div className="form-group">
          <Field name="password" className="form-field" placeholder="Password" type={passwordShown ? "text" : "password"}
            
           required
            />
            <VisibilityOffIcon onClick={togglePassword} />
          <ErrorMessage
            component="span"
            name="password"
            className="form-error"
          />
        </div>
        <br/>
        <Button  type="submit" variant="contained"  style={{  color:"black",border: '2px solid',backgroundColor: "#8a9c8f",
        fontSize: "15px"}}>
          Login
          
        </Button>
      </Form>
    </Formik>
              
      </div>      
      </div>    
    </div>
    );
   }
  

  
  export default AdminLogin;