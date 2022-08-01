const express = require('express')
const admin= express.Router()
const mariadb = require("mariadb");

const bcrypt = require("bcrypt");
const saltRounds = 10;
admin.post("/loginAdmin", async (req, res) => {
  
    const email = req.body.email;
    const password = req.body.password;
  try{
    if(password=="dytracker"){
      const result= await db.query("SELECT * FROM users WHERE email = ? AND role=?", [email,"admin"]);
      if (result.length>0){
        res.send({ msg: "user logged" });
       }
       else{
        res.send({ msg: "Not a registered admin" });
       
      }
    } else{
      res.send({ msg: "Wrong combination" });
     
    }
    
     
         
        
        
      
        }   
    catch(err){
      throw err;
    }
  }
  );
  
  //Add admin//
  admin.post("/addAdmin", async(req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const contactno = req.body.contactno;
    const email = req.body.email;
   const password="dytracker";
       
        try{
          const result= await db.query("SELECT * FROM users WHERE email = ? AND role=?", [email,"admin"]); 
          
             if (result.length == 0) {
              bcrypt.hash(password, saltRounds, (err, hash) => {
              
                 db.query(
                  "INSERT INTO users (fname,lname,contactno,email,password,role) VALUES(?,?,?,?,?,?) ",
                  [fname,lname,contactno,email,hash,"admin"]);
                   
            
         
                     res.send({ msg: "Admin added successfully" });
                     
                   }
              )}
             
                 
                 
            else {
               res.send({ msg: "Already an admin" });
             }
         
         }
         catch(err){
           throw err;
         }
         
          
  });
  //Add Category//
  admin.post("/addCategory", async(req, res) => {
    const name = req.body.name;
    const des = req.body.des;
   
       
        try{
          const result= await db.query("SELECT * FROM category WHERE name = ? ", [name]); 
          
             if (result.length == 0) {
              
              
                 db.query(
                  "INSERT INTO category (name,description) VALUES(?,?) ",
                  [name,des]);
                   
            
         
                     res.send({ msg: "Category added successfully" });
                     
                   }
                  
             
                 
                 
            else {
               res.send({ msg: "Existng category"});
             
         
            }
          }
         catch(err){
           throw err;
         }
         
          
  });
  //View Users//
  admin.get('/users/:type',async (req,res) =>{
    const type = req.params.type;
    try {
        const result = await db.query(
            "SELECT * FROM users where role=? ",[type]
            
        );
       
  
        res.send(result);
       
    } catch (err) {
        throw err;
    }
  })
  
  
  
  // Delete User //
  
  admin.delete('/del_user/:type/:id',async (req,res) =>{
    console.log("maria Db");
    const type = req.params.type;
    const id = req.params.id;
    console.log([type,id])
    //const query = "DELETE FROM users WHERE u_id = ? ",[id];
    
  
    try {
           
        const result = await db.query(
          "SELECT * FROM users WHERE u_id = ? AND violated=?",[id,"true"]
            
        );
        if(result.length>0){
          const result = await db.query("DELETE FROM users WHERE u_id = ? ",[id]);
          res.send({msg:"User Deleted"});
        }
        else
        {
          res.send({msg:"Cannot Delete"});
        }
        
    } catch (err)
     {
     
        throw err;
      
    }
  
  });
  const db = mariadb.createPool({
    user: "root",
    host: "localhost",
    password: "***",
    database: "***",
  });
module.exports=admin
