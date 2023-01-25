import { createBrowserRouter } from "react-router-dom";
import AdminPanelLayout from "../layout/AdminPanelLayout";
import Main from "../layout/Main";
import AddProducts from "../Pages/AddProducts/AddProducts";
import MyProducts from "../Pages/AddProducts/MyProducts";
import AllBuyers from "../Pages/AdminPanel/AllBuyers";
import AllSellers from "../Pages/AdminPanel/AllSellers";
import Blogs from "../Pages/Blogs/Blogs";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Login/Signup.";
import NotFound from "../Pages/NotFound/NotFound";
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
        path: '/user',
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
        path:'/my-products/:email',element:<PrivateRoute>
          <MyProducts></MyProducts>
        </PrivateRoute>
      },{
        path:'/blogs',element:<Blogs></Blogs>
      }
    ],
    
  },{
    path:'/admin',element:<PrivateRoute>
      <AdminPanelLayout></AdminPanelLayout>
    </PrivateRoute>,children:[
      {path:'/admin',element:<AllSellers></AllSellers>},
      {path:'admin/all-buyers',element:<AllBuyers></AllBuyers>}
    ]
  },
  {
    path:'/*',element:<NotFound></NotFound>
  }
])