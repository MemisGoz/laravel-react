import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import CreateProduct from "./views/CreateProduct.jsx";
import AllProducts from "./views/AllProducts.jsx";
import './index.css'
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Cart from "./pages/Cart.jsx";
const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/users"/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      },
      {
        path: '/products',
        element: <AllProducts/>
      },
      {
        path: '/products/new',
        element: <CreateProduct key="productCreate"/>
      },
      {
        path: '/products/:id',
        element: <CreateProduct key="productUpdate"/>
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      },
      {
        path: '/shop',
        element: <Shop/>
      },
      {
        path: '/cart',
        element: <Cart/>
      },
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;
