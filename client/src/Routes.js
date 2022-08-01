import React from "react";
import {Switch, Route} from 'react-router-dom';
import Home from './pages/Home';

import AdminLogin from "./pages/AdminLogin";
import ViewUsers from "./pages/ViewUsers";
import AddAdmin from "./pages/AddAdmin";

import ViewProducts from "./pages/ViewProducts";
import EditProduct from "./pages/editProduct";

function Routes(){
    return(
        <div>
<Switch>
    <Route exact path="/">
        <Home/>
    </Route>
  
    <Route  path="/adminLogin">
        <AdminLogin/>
    </Route>
   
</Switch>




<Switch>
    
    <Route path="/viewUsers">
        <ViewUsers/>
    </Route>
    <Route path="/addAdmin">
        <AddAdmin/>
    </Route>
</Switch>
<Switch>
    

    

  
</Switch>
</div>
    );
    
}
export default Routes;