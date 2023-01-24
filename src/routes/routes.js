import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AddProducts from "../Pages/AddProducts/AddProducts";
import AdminPanel from "../Pages/AdminPanel/AdminPanel";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Login/Signup.";
import Orders from "../Pages/Orders/Orders";
import Products from "../Pages/Products/Products/Products";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: '/', element: <Main></Main>, children: [
      { path: '/', element: <Home></Home> },
      {
        path: '/category/:id', loader: async ({ params }) => {
          const cat_id = params.id
          return fetch(`http://localhost:5000/category/${cat_id}`)
        },
        element: <PrivateRoute>
          <Products></Products>,
        </PrivateRoute>
      },
      { path: '/login', element: <Login></Login> },
      { path: '/signup', element: <Signup></Signup> },
      {
        path: '/user/:email',
        loader:async({params})=>{
          const email=params.email
          return fetch(`http://localhost:5000/user/bookings/${email}`)
        },
         element:
          <PrivateRoute>
            <Orders></Orders>
          </PrivateRoute>
      },{
        path:'/seller/:email',element:<PrivateRoute>
          <AddProducts></AddProducts>
        </PrivateRoute>
      },
      {
        path:'/admin/:email',element:<PrivateRoute>
          <AdminPanel></AdminPanel>
        </PrivateRoute>
      }


    ]
  }
])