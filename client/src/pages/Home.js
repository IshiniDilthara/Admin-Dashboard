
import Button from '@material-ui/core/Button';
import React from 'react'
import { Link } from 'react-router-dom';
import '../component/styles/Home.css' ;



function Home(){
return(
  <div>
     
      <div class="split left">
    
   <img src="https://cdn.pixabay.com/photo/2018/07/26/09/56/ecommerce-3563183_960_720.jpg" alt="pic"    style={{
              width: 850,
              height: 620,
              
              
            }}/>  
      </div>  
      
      <div class="split right"> 
     
 
<div className='second'>
  <div className='topic'>
  <h1 style={{fontStyle:"-moz-initial" , fontSize:"40px"}}>LET'S PROCEED!</h1>
  </div>
<Button component={Link} to="/AdminLogin" variant="outlined" color="primary"  style={{ height: "45%", width: "45%", 
        padding: "10px 10px", color:"black",border: '2px solid',
        fontSize: "18px"}}>
  Sign in
</Button>
<br></br>


  </div>
  </div>
  </div>
  
   

);


}
export default Home;

