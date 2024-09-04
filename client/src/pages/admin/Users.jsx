import moment from 'moment';
import React, { useEffect, useState } from 'react'

import{Select} from 'antd';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
const Users = () => {
      const [auth, setAuth] = useAuth();
    const[users,setusers]=useState()
    const[type,settype]=useState("All")
    const make = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/makeSeller/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      const res=await response.json()
      if (response.ok) {

        toast.success("Updated successfully");
       
       getusers();
        
      }
    } catch (error) {
      console.log(error);
    }
  };
   const remove = async (id) => {
     try {
       const response = await fetch(
         `http://localhost:3000/api/auth/removeSeller/${id}`,
         {
           method: "PUT",
           headers: {
             Authorization: auth?.token,
           },
         }
       );
       const res = await response.json();
       if (response.ok) {
         toast.success("Updated successfully");

         getusers();
       }
     } catch (error) {
       console.log(error);
     }
   };
    const getusers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/getall`, {
          method: "GET",
        });

        console.log(response);
        const res = await response.json();
        console.log(res);
        if (response.ok) {
          setusers(res.user);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getusers();
    }, []); 
    useEffect(()=>{
        console.log(type)
    },[type,settype])  
  return (
    <div className="h-screen">
      <div className="justify-center  overflow-auto my-10 flex gap-10">
        <span className="text-5xl  font-serif underline">Users</span>
        <select
          className="w-32 h-10 rounded-lg px-2 mt-2 outline-none text-xl border border-black bg-gray-100 placeholder-black"
          placeholder="All"
          onChange={(e) => {
            settype(e.target.value);
          }}
        >
          <option value="All">All</option>
          <option value="Sellers">Sellers</option>
          <option value="Buyers">Buyers</option>
        </select>
      </div>

      <div>
        {users?.map((user) => (
          <div key={user._id} className="pt-10 px-10">
            {user._id === auth.user._id ? (
              <></>
            ) : (
              <div>
                <div className="flex justify-between  ">
                  {type === "All" ? (
                    <>
                      <div className="flex  flex-col gap-5 w-72  text-3xl">
                        <div className="flex gap-4">
                          <span>{user.name}</span>
                          <span>({user.type})</span>
                        </div>

                        <span>{user.email}</span>
                      </div>
                      <div className=" w-96 flex justify-center  text-white text-2xl">
                        {user.type === "seller" ? (
                          <div className=" flex gap-10">
                            <button className="bg-yellow-600 px-5 py-1 h-12 rounded-xl border border-black hover:bg-yellow-700">
                              Orders
                            </button>
                            <button className="bg-blue-600 px-5 py-1 h-12 rounded-xl border border-black hover:bg-blue-700">
                              Products
                            </button>
                          </div>
                        ) : (
                          <div className="flex">
                            <button className="bg-yellow-600 px-5 py-1 h-12 rounded-xl border border-black hover:yellow-red-700">
                              Orders
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-10 text-2xl text-white">
                        <button className="bg-red-600 px-5 py-1 h-12 rounded-xl border border-black hover:bg-red-700 w-72">
                          {user.type === "seller" ? (
                            <button onClick={() => remove(user._id)}>
                              Remove from sellers
                            </button>
                          ) : (
                            <button onClick={() => make(user._id)}>
                              Add to sellers
                            </button>
                          )}
                        </button>
                      </div>
                    </>
                  ) : type === "Sellers" ? (
                    <>
                      {user.type === "seller" ? (
                        <>
                          <div className="flex  flex-col gap-5 w-72   text-3xl">
                            <div className="flex gap-4">
                              <span>{user.name}</span>
                              <span>({user.type})</span>
                            </div>

                            <span>{user.email}</span>
                          </div>
                          <div className=" w-96 flex justify-center  text-white text-2xl">
                            <div className=" flex gap-10">
                              <button className="bg-yellow-600 px-5 py-1 h-12 rounded-xl border border-black hover:bg-yellow-700">
                                Orders
                              </button>
                              <button className="bg-blue-600 px-5 py-1 h-12 rounded-xl border border-black hover:bg-blue-700">
                                Products
                              </button>
                            </div>
                          </div>

                          <div className="flex gap-10 text-2xl text-white">
                            <button
                              className="bg-red-600 px-5 py-1 h-12 rounded-xl border border-black hover:bg-red-700 w-72"
                              onClick={() => remove(user._id)}
                            >
                              Remove from sellers
                            </button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : type === "Buyers" ? (
                    <>
                      {user.type === "buyer" ? (
                        <>
                          <div className="flex  flex-col gap-5 w-72  text-3xl">
                            <div className="flex gap-4">
                              <span>{user.name}</span>
                              <span>({user.type})</span>
                            </div>

                            <span>{user.email}</span>
                          </div>
                          <div className=" w-96 flex justify-center  text-white text-2xl">
                            <div className="flex">
                              <button className="bg-yellow-600 px-5 py-1 h-12 rounded-xl border border-black hover:yellow-red-700">
                                Orders
                              </button>
                            </div>
                          </div>

                          <div className="flex gap-10 text-2xl text-white">
                            <button
                              className="bg-red-600 px-5 py-1 h-12 rounded-xl border border-black hover:bg-red-700 w-72"
                              onClick={() => make(user._id)}
                            >
                              Add to sellers
                            </button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users
