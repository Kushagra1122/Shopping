import React, { useEffect, useState } from 'react'
import { CiHeart } from 'react-icons/ci';
import { IoHeart, IoHeartOutline, IoSearchOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

const Details = () => {
     const search = useParams();
     const [product, setproduct] = useState();

     const getProduct = async () => {
       try {
         const response = await fetch(
           `http://localhost:3000/api/product/get/${search.id}`,
           {
             method: "GET",
           }
         );

         const res = await response.json();

         if (response.ok) {
           setproduct(res.product);
         } else {
           toast.error(res.message);
         }
       } catch (error) {}
     };
     useEffect(() => {
       getProduct();
     }, []);
     console.log(product)
  return (
    <div className="my-20 mx-32">
      <div className=" flex ">
        <div className="flex flex-col gap-10 items-start">
          <div className="relative flex flex-col border border-gray-300 rounded-xl gap-10 p-2 w-96 items-center">
            <img src={product?.photo} alt="" className='h-72' />
            <div
              className="absolute rounded-full p-2 m-1 right-0 top-0 border border-gray-200 z-50 text-gray-500 "
              onClick
            >
              <IoHeart size={20} />
            </div>
          </div>
          <div className="flex gap-5 justify-center px-10 w-96">
            <button className="w-44 py-3 bg-orange-600 text-white">
              Add to cart
            </button>
            <button className="w-44 py-3 bg-red-600 text-white">Buy now</button>
          </div>
        </div>
        <div className="flex flex-col gap-5 mx-20 my-10 justify-between">
          <div className="flex flex-col gap-5">
            <span className="text-3xl ">{product?.name}</span>
            <span className="text-xl">rating</span>
            <span className="text-4xl font-bold">${product?.price}</span>
           
          </div>
          <div>
            <span>{product?.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details
