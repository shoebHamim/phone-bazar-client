import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Login/Signup.";
import Products from "../Pages/Products/Products/Products";

export const router=createBrowserRouter([
  {path:'/',element:<Main></Main>,children:[
    {path:'/',element:<Home></Home>},
    {path:'/category/:id',loader:async({params})=>{
      const cat_id= params.id
      return fetch(`http://localhost:5000/category/${cat_id}`)
    },
    element:<Products></Products>},
    {path:'/login',element:<Login></Login>},
    {path:'/signup',element:<Signup></Signup>}
    

  ]}
])