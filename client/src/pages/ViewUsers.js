import React from 'react';
import '../component/styles/Viewusers.css';
import {useState} from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Card from '@mui/material/Card';
export default function ViewUsers(){
    
    const [userList,setUserList] = useState([]);
    const [role, setRole] = useState("Users");
    const [searchterm, setSearchterm] = useState("");
    const [disabled, setDisabled] = useState(false);

    const handleDelete=(id)=>{
        deleteProduct(id);
        alert("User Deleted");
        window.location.reload(false);
        
    }
    const deleteProduct =(id) =>{
        let showRole = setRoleOut(role);
        
        console.log("role:" +showRole);
        Axios.delete('http://localhost:3001/del_user/'+showRole+'/'+id).then(()=>{
            console.log("git hub");

        })
            
           
    };


    const recieveUsersByRole =() =>{
        let showRole = setRoleOut(role);
        setDisabled(!disabled);
        if(showRole ==="Users"){
            setUserList([]);
            return;
        } 

        
        Axios.get('http://localhost:3001/users/'+showRole).then((users) => {
        console.log(users.data);
        
        if(users.data.length ===0){
            alert("No Data");
        }
        setUserList(users.data); 
         
            })

            
    };

    
    



            return (
        <div  >
            <div className='list3'>
                <div> 
                    <h1 className='title'> View {role} </h1>
                </div>

                <div className='productList'>
                <Card
          style={{
            maxWidth: 450,
            padding: "20px 5px",
            margin: "0 auto",
            backgroundColor: "#ebebeb",
          }}
        >
                        <label>Role</label>
                        <select onChange={(event) => setRole(event.target.value)}>
                        <option value="Users">Select A Role</option>
                            <option value="Customers">Customers</option>
                            <option value="Sellers">Sellers</option>
                            <option value="Admin Panel">Admins</option>     
                        </select>

                        <Button onClick={recieveUsersByRole}> Check Users By Role</Button>
                        <input className="search" type={Text} placeholder="Search users by their name.." onChange={event=>{setSearchterm(event.target.value)}} disabled={!disabled}></input>
                        <p >Want to make a new admin
              <Link to="/addAdmin"> Add admin</Link>
              </p>
              </Card>     
                </div>
                
                
                <div className='grid'>
                    { userList.filter((val)=>{
                        if(searchterm==""){
                            return val;
                        }
                        else if(val.fname.toLowerCase().includes(searchterm.toLowerCase())){
                            return val;
                        }

                    })
                    .map((val,key) => {
                        return (
                            
                        
                            <div className='setInVar'>
                                <Card
                    style={{
                      margin: 8,
                      backgroundColor: "#e6f3ff",
                      width:"250px"
                    }}
                  >
                               <span> NAME :</span>  {val.fname}
                               <br/>
                              
                               <span>EMAIL : </span> {val.email}
                               <br/>
                               <span>CONATACT NUMBER : </span> {val.contactno}
                                <br/>
                                <Button  onClick={()=>{handleDelete(val.u_id)}}  style={{border: '2px solid', fontSize: "10px"}}>DELETE</Button>
                                </Card>
                                
                            </div>
                            
                        )
                        
                     })}
                     
                </div>

 
            </div>
            
        </div>
        
    );
}

function setRoleOut(role){
    switch(role){
        case "Customers":
            return "customers";
        case "Sellers":
            return "sellers";
        case "Admin Panel":
            return "admin";
        default :
            return "Users";
    }
}
