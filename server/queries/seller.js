const express = require('express')
const seller= express.Router()
const mariadb = require("mariadb");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const dotenv = require('dotenv');
const mg = require('mailgun-js');

require('dotenv').config();
const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });






seller.post("/sellerReg", async(req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const contactno = req.body.contactno;
    const email = req.body.email;
    const password = req.body.password;
   
       
        try{
          const result= await db.query("SELECT * FROM users WHERE email = ? AND role=? ", [email,"seller"]); 
           
             if (result.length == 0) {
               bcrypt.hash(password, saltRounds, (err, hash) => {
                 db.query(
                  "INSERT INTO users (fname,lname,contactno,email,PASSWORD,role) VALUES(?,?,?,?,?,?)",
                  [fname,lname,contactno,email, hash,"seller"]);
                   
                
         
                     res.send({ msg: "User registered successfully and check your email" });
                     mailgun()
                     .messages()
                     .send(
                       {
                         from: 'DY TRACKER <dytracker@mg.yourdomain.com>',
                         to: `${email}`,
                         subject:`DY TRACKER`,
                         html: `<h3>Hello ${fname}!</h3><p> Welcome to DY TRACKER. You have successfully registered as a seller.  <br>Thanks for joining with us. </p>`
                       }
                       
                     );
                   }
                 );
           
                 }
            else {
               res.send({ msg: "E-mail already registered" });
             }
        
         }
         catch(err){
           throw err;
         }
         
          
  });
  /////////
  seller.post("/store", async(req, res) => {
    const name = req.body.name;
    const des = req.body.des;
    ;
    const email = req.body.email;
    
   
       
        try{
          const result= await db.query("SELECT * FROM shop WHERE email = ? AND name=? ", [email,name]); 
           
             if (result.length == 0) {
        
                 db.query(
                  "INSERT INTO shop (name,description,email) VALUES(?,?,?)",
                  [name,des,email]);
                   
                
         
                     res.send({ msg: "Store added" });
                    
                  
                   
                 
           
                 }
            else {
               res.send({ msg: "Existing store" });
             }
        
         }
         catch(err){
           throw err;
         }
         
          
  });
  /////////
  seller.post("/loginSeller", async (req, res) => {
  
    const email = req.body.email;
    const password = req.body.password;
  try{
    const result= await db.query("SELECT email FROM users WHERE email = ? AND role=?", [email,"seller"]);
    if(result.length == 0){
      res.send({ msg: "Not a registered user" });
    }
    else{
      const result= await db.query("SELECT email,PASSWORD,role FROM users WHERE email = ? AND role=?", [email,"seller"]);
      bcrypt.compare(password, result[0].PASSWORD, (error, response) => {
         
          if(response){
            res.send({ msg: "user logged" });
            
          }
          else {
            res.send({ msg: "Pasword doesn't matched with the registered email" });
            
          }
        }
       );
      }
        }   
    catch(err){
      throw err;
    }
  }
  );
  ///////////
  seller.post("/sendEmailSeller", async(req, res) => {
  
    const email = req.body.email;
   
   
      
        try{
          const result= await db.query("SELECT * FROM users WHERE email = ? AND role=?", [email,"seller"]); 
          
          
             if (result.length != 0) {
              console.log(result[0].fname);
              res.send({ err: "Check your email. Reset password link will be there" });
                 mailgun()
                 .messages()
                 .send(
                   {
                     from: 'DY TRACKER <dytracker@mg.yourdomain.com>',
                     to: `${email}`,
                     subject:`DY TRACKER`,
                     html: `<h3>Hello !</h3><p> If you want to reset password. </p>  <a href="http://localhost:3000/resetPwSeller">Click here</a>
                     `
                   }
                   
                 );
              }

             
  

            
                 
                 
            else {
               res.send({ err: "User doesn't exist" });
             }
        
         }
         catch(err){
           throw err;
         }
         
          
  });
  /////////////
  seller.post("/sellerResetPw", async(req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const contactno = req.body.contactno;
    const email = req.body.email;
    const password = req.body.password;
   
      
        try{
          const result= await db.query("SELECT * FROM users WHERE email = ?", [email]); 
          
          
             if (result.length != 0) {
              console.log(result[0].fname);
              if(result[0].fname==fname && result[0].lname==lname&&result[0].contactno==contactno){
                               bcrypt.hash(password, saltRounds, (err, hash) => {
                 db.query(
                  "UPDATE users SET password = ?  WHERE email = ? AND role=?",
                  [ hash,email,"seller"]);
                   
                  
         
                     res.status(200).send({ msg: "Password Reset" });
                     
                   }
                 );
                 mailgun()
                 .messages()
                 .send(
                   {
                     from: 'DY TRACKER <dytracker@mg.yourdomain.com>',
                     to: `${email}`,
                     subject:`DY TRACKER`,
                     html: `<h3>Hello ${fname}!</h3><p> Password reset succesfully. </p>`
                   }
                   
                 );
              }else{
                res.send({ err: "Failed to reset password" });
              }

             
  

            
                 
                 }
            else {
               res.send({ err: "User doesn't exist" });
             }
        
         }
         catch(err){
           throw err;
         }
         
          
  });
  const db = mariadb.createPool({
    user: "root",
    host: "localhost",
    password: "Ishdil",
    database: "dy",
  });

module.exports=seller