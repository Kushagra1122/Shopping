import "./App.css";
import React, { useEffect } from "react";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Request from "./pages/admin/Requests";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import Stocks from "./pages/admin/Stocks";
import { useAuth } from "./context/auth";
import { useSocket } from "./context/socket";

import SingleProduct from "./pages/admin/SingleProduct";
import Details from "./pages/Details";
import Notifications from "./pages/Notifications";
import MyAccount from "./pages/MyAccount";

const App = () => {
  const [auth, setAuth] = useAuth();
 

 
const user =async()=>{
if (auth.user===null){
  return
}
try {
  const response = await fetch("http://localhost:3000/api/auth/session", {
    headers: {
      Authorization: auth.token,
    },
  });
  const res = await response.json();
  console.log(res);
} catch (error) {console.log(error)}
  
}
useEffect(()=>{
user()
},[auth])
  return (
    <div className="flex flex-col justify-between">
      <div>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/requests" element={<Request />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/product/:id" element={<SingleProduct />} />
            <Route exact path="/details/:id" element={<Details />} />
            <Route exact path="/categories" element={<Categories />} />
            <Route exact path="/stocks" element={<Stocks />} />
            <Route exact path="/notifications" element={<Notifications />} />
            <Route exact path="/account" element={<MyAccount />} />
            <Route exact path="/*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
