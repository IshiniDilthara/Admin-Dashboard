import React, { useState, /*useEffect*/} from "react";
import Axios from "axios";
import '../component/styles/st.css'
import Button from '@material-ui/core/Button';
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
const AddAdmin = ({ submitForm }) => {
  
  
  
  
    const addAdmin = (values) => {
      Axios.post("http://localhost:3001/addAdmin", {
        fname:values.fname,
        lname:values.lname,
        contactno:values.contactno,
        email: values.email,
        
        
      }).then((response) => {
     
        alert(response.data.msg);
      });
    };
  

  /*  const getCustomers = () => {
     
      Axios.get("http://localhost:3001/Customers", {}).then((response) => {
     
        setCustomerList(response.data);
      });
    };*/
    const phoneRegExp = "^[0].{9}$"
    const digitsOnly = (value) => /^\d+$/.test(value)
    const validationsRegister = yup.object().shape({
      fname: yup
      .string()
      .required('First name is required'),
      lname: yup
      .string()
      .required('Last name is required'),
      contactno: yup
      .string()
      .length(10,"Phone number length should 10 characters long")
      .test('Digits only', "Phone number should contain only digits", digitsOnly)
      .matches(phoneRegExp,"Contact number should start with zero")
      .required('A phone number is required'),
      email: yup
        .string()
        .email("invalid email")
        .required("Email is required"),
     
    });
  
    return (
      <div className="container">
      
          <h1>Add admin</h1>
          <Formik
        initialValues={{}}
        onSubmit={addAdmin}
        validationSchema={validationsRegister}
      >
          
        <Form className="register-form">
          <div className="register-form-group">
            <Field name="fname" className="form-field" placeholder="First name" 
             
            />

            <ErrorMessage
              component="span"
              name="fname"
              className="form-error"
            />
          </div>
          <div className="register-form-group">
            <Field name="lname" className="form-field" placeholder="Last name" 
            
            />
          <ErrorMessage
              component="span"
              name="lname"
              className="form-error"
            />
           
          </div>
          <div className="register-form-group">
            <Field name="contactno" className="form-field" placeholder="Contact number"   
            
            />
             <ErrorMessage
              component="span"
              name="contactno"
              className="form-error"
            />
           
          </div>

          <div className="register-form-group">
            <Field name="email" className="form-field" placeholder="Email" 
            
            
            />

            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>

         
          
<br/>
          <Button type="submit" variant="contained" style={{   height: "5%", width: "40%",color:"black",border: '2px solid', backgroundColor: "#8a9c8f",
        fontSize: "15px"}} >
              Add   admin
            </Button>
        </Form>
      </Formik>
      </div>
     
    );
        }
export default AddAdmin;
