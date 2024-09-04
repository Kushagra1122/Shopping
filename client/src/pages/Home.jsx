import React, { useEffect, useState } from "react";
import CarouselComponent from "../components/Carousel";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";

const Home = () => {
  const [auth, setAuth] = useAuth();
  const [show, setshow] = useState(false);
  const [products, setproducts] = useState();
  const [Id, setId] = useState("");
  const getProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/product/getall`, {
        method: "GET",
      });

      const res = await response.json();

      if (response.ok) {
        setproducts(res.product);
      } else {
        toast.error(res.message);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getProducts();
  }, []);
  const enter = (id) => {
    setId(id);
    setshow(true);
  };
  const leave = (id) => {
    setId("");
    setshow(false);
  };
  const add=(id)=>{
   
    toast.success('Added to cart')

  }
  console.log(auth?.user?.cart)
  return (
    <div className="">
      <CarouselComponent />
      <div>
        <div className="flex justify-center font-serif py-20   text-7xl">
          <span className=" underline">Our </span>
          <span className="pl-5 text-red-500 underline">Products</span>
        </div>

        <div className="flex justify-center flex-wrap m-10">
          {products?.map((p) => (
            <div
              key={p._id}
              className="flex flex-col gap-5 border border-gray-500 rounded-lg p-5 mx-20 my-10 h-80 w-60"
              onMouseEnter={() => enter(p._id)}
              onMouseLeave={() => leave(p._id)}
            >
              {show && Id === p._id ? (
                <div>
                  <div className="absolute z-50  w-[200px]">
                    <div className="flex flex-col gap-6  text-white text-xl justify-center items-center   h-[250px]  p-5">
                      <Link to={`/details/${p._id}`} className="px-5 py-2 bg-blue-500  rounded-full hover:bg-blue-700">
                        More details
                      </Link>
                      <button onClick={()=>add(p._id)} className="px-5 py-2 bg-red-500  rounded-full hover:bg-red-700">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className=" flex justify-center">
                <img
                  src={p.photo}
                  alt="image"
                  className={`h-44 transition ease-in-out ${
                    show && Id === p._id
                      ? " scale-75  duration-300  blur-sm"
                      : ""
                  }`}
                />
              </div>

              <div className="flex flex-col gap-2 ">
                <span className="text-2xl text-center">{p.name}</span>
                <span className="text-center text-xl">from ${p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
