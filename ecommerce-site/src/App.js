import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";
import logo from "./logo.png";


// using lazy
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));

const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const UserRoute = lazy(() => import("./components/Routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/Routes/AdminRoute"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCouponPage = lazy(() =>
  import("./pages/admin/coupon/CreateCouponPage")
);
const Payment = lazy(() => import("./pages/Payment"));









// import React, { useEffect } from 'react';
// import {Switch, Route} from 'react-router-dom';
// import {ToastContainer} from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import Home from './pages/Home';
// import Header from './components/nav/Header';
// import RegisterComplete from './pages/auth/RegisterComplete';
// import {auth} from './firebase';
// import {useDispatch} from 'react-redux';
// import ForgotPassword from './pages/auth/ForgotPassword';
// import {currentUser} from './functions/auth';
// import History from './pages/user/History';
// import UserRoute from './components/Routes/UserRoute';
// import AdminRoute from './components/Routes/AdminRoute';
// import Password from './pages/user/Password';
// import Wishlist from './pages/user/Wishlist';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import CategoryCreate from "./pages/admin/category/CategoryCreate";
// import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
// import SubCreate from "./pages/admin/sub/SubCreate";
// import SubUpdate from "./pages/admin/sub/SubUpdate";
// import ProductCreate from "./pages/admin/product/ProductCreate";
// import ProductUpdate from "./pages/admin/product/ProductUpdate";
// import AllProducts from './pages/admin/product/AllProducts';
// import Product from './pages/Product';
// import CategoryHome from "./pages/category/CategoryHome";
// import SubHome from "./pages/sub/SubHome";
// import Shop from './pages/Shop';
// import Cart from "./pages/Cart";
// import SideDrawer from "./components/drawer/SideDrawer";
// import Checkout from "./pages/Checkout";
// import Payment from "./pages/Payment";
// import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage";

const App=()=> {
  const dispatch = useDispatch();

// to check firebase auth state
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      console.log("user", user);

      currentUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
        })
        .catch((err) => console.log(err));
    }
  });
  // cleanup
  return () => unsubscribe();
}, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="col mt-5 text-center p-5">
          <img src={logo}/>
          <LoadingOutlined />
         
        </div>
      }
    >
    <Header/>
    <ToastContainer />
    <SideDrawer />
   <Switch>
     <Route exact path="/" component={Home}/>
     <Route exact path="/login" component={Login}/>
     <Route exact path="/register" component={Register}/>
     <Route exact path="/register/complete" component={RegisterComplete}/>
     <Route exact path="/forgot/password" component={ForgotPassword}/>
     <UserRoute exact path="/user/history" component={History}/>
     <UserRoute exact path="/user/password" component={Password}/>
     <UserRoute exact path="/user/wishlist" component={Wishlist}/>
     <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
     <AdminRoute exact path="/admin/category" component={CategoryCreate} />
     <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
     <AdminRoute exact path="/admin/sub" component={SubCreate} />
     <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
     <AdminRoute exact path="/admin/product" component={ProductCreate} />
     <AdminRoute exact path="/admin/products" component={AllProducts} />
     <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
     <Route exact path="/product/:slug" component={Product}/>
     <Route exact path="/category/:slug" component={CategoryHome} />
     <Route exact path="/sub/:slug" component={SubHome} />
     <Route exact path="/shop" component={Shop} />
     <Route exact path="/cart" component={Cart} />
     <UserRoute exact path="/checkout" component={Checkout} />
     <UserRoute exact path="/payment" component={Payment} />
     <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
   </Switch>
   </Suspense>
  );
};

export default App;

