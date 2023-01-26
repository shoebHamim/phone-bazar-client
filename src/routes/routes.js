import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import AddProducts from "../Pages/AddProducts/AddProducts";
import MyProducts from "../Pages/AddProducts/MyProducts";
import AllBuyers from "../Pages/AdminPanel/AllBuyers";
import AllSellers from "../Pages/AdminPanel/AllSellers";
import ReportedItems from "../Pages/AdminPanel/ReportedItems";
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
        path:'/blogs',element:<Blogs></Blogs>
      }
    ],
  },{
    path:'/dashboard',element:<PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,children:[
      {path:'/dashboard/add-product',element: <AddProducts></AddProducts>},
      {path:'/dashboard/my-products',element: <MyProducts></MyProducts>},
      {path:'/dashboard/all-sellers',element: <AllSellers></AllSellers>},
      {path:'/dashboard/all-buyers',element: <AllBuyers></AllBuyers>},
      {path:'/dashboard/my-orders',element: <Orders></Orders>},
      {path:'/dashboard/reported-items',element: <ReportedItems></ReportedItems>},
    ]
  }
  
  
  
  ,{
    path:'/*',element:<NotFound></NotFound>
  }
])