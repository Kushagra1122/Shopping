import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
const Request = () => {
  const [auth, setAuth] = useAuth();
  const [requests, setrequests] = useState();
  const navigate = useNavigate();
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
      const res = await response.json();
      if (response.ok) {
        toast.success("Updated successfully");

        getall();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const dlt = async (id) => {
    try {
      console.log(id);
      const response = await fetch(
        `http://localhost:3000/api/request/dlt/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      getall();
    } catch (error) {}
  };
  const accept = async (_id, id) => {
    await make(_id);
    await dlt(id);
  };
  const reject = async (id) => {
    await dlt(id);
  };
  const getall = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/request/get", {
        method: "GET",
        headers: {
          Authorization: auth?.token,
        },
      });
      const res = await response.json();

      if (response.ok) {
        setrequests(res.requests);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getall();
  }, []);
useEffect(() => {
 if (auth?.user?.type!=="admin"){
    navigate('/')
 }
}, []);
  return (
  
        <>
          <div className="text-center my-10">
            <span className="text-5xl  font-serif underline">Requests</span>
          </div>
          {requests?.map((r) => (
            <div key={r._id} className="p-10">
              <div className="flex justify-between ">
                <div className="flex  flex-col gap-5 w-72  text-3xl">
                  <span>{r.name}</span>
                  <span>{r.email}</span>
                </div>
                <div>
                  <span className="text-3xl text-red-600 underline">
                    Wants to be a seller
                  </span>
                </div>

                <div className="flex gap-10 text-2xl text-white">
                  <button
                    onClick={() => accept(r.id, r._id)}
                    className="bg-blue-600 px-5 py-1 h-12 rounded-xl border border-black hover:bg-blue-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => reject(r._id)}
                    className="bg-red-600 px-5 py-1 h-12 rounded-xl border border-black hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                {moment(r.createdAt).fromNow()}
              </div>
            </div>
          ))}
        </>
     
     
  );
};

export default Request;
