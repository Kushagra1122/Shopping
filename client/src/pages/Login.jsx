import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Login = () => {
   const [auth, setAuth] = useAuth();
   const [email, setemail] = useState("");
   const [password, setpassword] = useState("");
const navigate=useNavigate()
   useEffect(() => {
     if (auth.user !== null) {
       navigate("/");
     }
   });
     const handlesubmit = async (e) => {
       e.preventDefault();

       try {
         const response = await fetch(`http://localhost:3000/api/auth/login`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             email,
             password,
           }),
         });

         console.log(response);
         const res = await response.json();
         console.log(res);
         if (response.ok) {
           setAuth({
             ...auth,
             user: res.user,
             token: res.token,
           });
           localStorage.setItem("auth", JSON.stringify({token:res.token}));
           toast.success("login successfull");
           navigate("/");

           setemail("");
           setpassword("");
         } else {
           toast.error(res.message);
         }
       } catch (error) {
         console.log(error);
       }
     };
  return (
    <div className="flex  my-32 justify-center items-center">
      <div className="flex gap-32">
        <img src="/images/Side.png" alt="" className="h-[400px] w-[400px" />
        <div className="flex flex-col gap-4">
          <span className="text-4xl">Login to our General Store</span>
          <span className="text-sm">Enter your details below</span>
          <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
            <input
              type="email"
              placeholder="Email"
              className="border-b py-2 border-gray-500 outline-none"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border-b py-2 border-gray-500  outline-none"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-96 bg-red-500 text-white py-2 mt-5 hover:bg-red-600 rounded-lg"
            >
              Login
            </button>
            <div className="text-center mt-2">
              <span className="text-gray-500">Don't have a account?</span>
              <Link
                to="/signup"
                className="ml-3 cursor-pointer hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login
