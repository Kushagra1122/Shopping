import React, { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import {
  IoCartOutline,
  IoHeart,
  IoHeartOutline,
  IoSearch,
  IoSearchOutline,
} from "react-icons/io5";
import { TiMessageTyping } from "react-icons/ti";
import { RxDashboard } from "react-icons/rx";
import { TbCategoryPlus } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { BsShop } from "react-icons/bs";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { LiaShoppingBasketSolid } from "react-icons/lia";
import { BsBox } from "react-icons/bs";
import { AiOutlineStock } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import toast from "react-hot-toast";
const Navbar = ({user}) => {
  const [auth, setAuth] = useAuth();
  const [hover, sethover] = useState(false);
  const [dash, setdash] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    toast.success("You have logged out ");
    setAuth({
      ...auth,
      user: null,
      token: null,
    });
     localStorage.removeItem("auth");
    navigate("/login");

   
  };
  const send = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/request/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
        body: JSON.stringify({
          id,
        }),
      });
      console.log(response);
      const res = await response.json();
      if (response.ok) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {}
  };

  return (
    <div className="pt-5 pb-2 px-20 border-b border-gray-300 relative">
      <div className="flex justify-between h-20 items-center">
        <Link to="/" className="text-2xl">
          General Store
        </Link>
        <div className="flex  gap-5">
          <form>
            <div className=" flex gap-5 border rounded-lg border-black bg-gray-100 p-2 ">
              <input
                type="text"
                placeholder="What you are looking for"
                className="bg-gray-100 outline-none text-lg w-80"
              />
              <span>
                <IoSearchOutline size={30} />
              </span>
            </div>
          </form>
        </div>
        <div className="flex gap-10 text-xl">
          <Link to="/">Home</Link>
          {auth.user === null ? (
            <>
              <Link to="/signup">SignUp</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              <div>Shop</div>

              <div
                className="flex gap-2   "
                onMouseEnter={() => sethover(true)}
                onMouseLeave={() => sethover(false)}
              >
                <span>{auth.user.name}</span>
                {hover ? (
                  <RiArrowDropUpLine size={30} />
                ) : (
                  <RiArrowDropDownLine size={30} />
                )}

                <div className="absolute top-[75px] right-48 z-50 ">
                  {hover ? (
                    <div className="flex flex-col bg-white border border-black p-6 gap-6 rounded-xl">
                      <Link to="/account" className="cursor-pointer flex gap-2">
                        <FaUserCircle className="" size={30} />
                        My account
                      </Link>

                      <span className="">
                        {auth.user.type === "admin" ? (
                          <div className="flex flex-col gap-6">
                            <Link
                              to="/requests"
                              className="cursor-pointer flex gap-2"
                            >
                              <TiMessageTyping size={30} />
                              Requests
                            </Link>
                            <div
                              onMouseEnter={() => setdash(true)}
                              onMouseLeave={() => setdash(false)}
                            >
                              <div className="cursor-pointer flex  gap-2">
                                <RxDashboard size={30} />
                                <span>Dashboard</span>
                              </div>

                              <div className="absolute top-[75px] right-[166px] z-50  ">
                                {dash ? (
                                  <div className="flex flex-col bg-white border border-black p-6 gap-6 rounded-xl">
                                    <Link
                                      to="/users"
                                      className="cursor-pointer flex gap-2"
                                    >
                                      <FaRegUserCircle className="" size={30} />
                                      Users
                                    </Link>
                                    <Link
                                      to="/categories"
                                      className="cursor-pointer flex gap-2"
                                    >
                                      <TbCategoryPlus className="" size={30} />
                                      Categories
                                    </Link>
                                    <Link
                                      to="/products"
                                      className="cursor-pointer flex gap-2"
                                    >
                                      <LiaShoppingBasketSolid
                                        className=""
                                        size={30}
                                      />
                                      Products
                                    </Link>
                                    <Link
                                      to="/stocks"
                                      className="cursor-pointer flex gap-2"
                                    >
                                      <AiOutlineStock className="" size={30} />
                                      Stocks
                                    </Link>
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : auth.user.type === "seller" ? (
                          <span className="cursor-pointer flex gap-2">
                            <BsBox size={30} />
                            Your products
                          </span>
                        ) : (
                          <div
                            onClick={() => send(auth.user._id)}
                            className="cursor-pointer flex gap-2"
                          >
                            <BsShop className="" size={30} />
                            Be a seller
                          </div>
                        )}
                      </span>
                      <span className="cursor-pointer flex gap-2">
                        <LiaShoppingBasketSolid className="" size={30} />
                        Orders
                      </span>
                      <span
                        onClick={logout}
                        className="cursor-pointer flex gap-2"
                      >
                        <CiLogout className="" size={30} />
                        Log out
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </>
          )}

          {auth.user === null ? (
            <></>
          ) : (
            <div className="flex ml-5 gap-5">
              <span>
                <IoHeartOutline size={30} />
              </span>
              <span>
                <IoCartOutline size={30} />
              </span>
              <Link to="/notifications">
                <IoMdNotificationsOutline size={30} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
