import { Descriptions, Modal } from "antd";
import React, { isValidElement, useEffect, useState } from "react";
import uploadFile from "../../helper/upload";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

const Products = () => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState("");
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState();
  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [stock, setstock] = useState("");
  const [min, setmin] = useState("");
  const[purchase_price,setpurchase_price]=useState("")
  const [products, setproducts] = useState();
  const [auth, setAuth] = useAuth();
  const[isModalOpen,setIsModalOpen]=useState(false)
  const [desc,setdesc]=useState("")
 const [type, settype] = useState("All");

    const getCategories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/category/getall`,
          {
            method: "GET",
          }
        );

        const res = await response.json();

        if (response.ok) {
          setCategories(res.category);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    const handleUploadPhoto = async (e) => {
      const file = e.target.files[0];

      const xyz = await uploadFile(file);

      setUploadPhoto(xyz?.url);
    };

    const handleproductsubmit = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (stock < 0 || min < 0 || price < 0) {
        toast.error("Price or stock or minimum value can not be less than 0");
      } else {
        try {
          console.log(categories);
          const response = await fetch(
            `http://localhost:3000/api/product/create`,
            {
              method: "POST",
              headers: {
                Authorization: auth?.token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                category,
                price,
                description:desc,
                photo: uploadPhoto,
                stock,
                min,
              }),
            }
          );
          console.log(response);
          const res = await response.json();
          console.log(res);
          if (response.ok) {
            toast.success(res.message);
            setIsProductModalOpen(false);
            setIsModalOpen(false)
            setName("");
            setCategory("");
            setdesc("")
            setprice("");
            setUploadPhoto("");
            setstock("");
            setmin("");
            getProducts();
          } else {
            toast.error(res.error);
          }
        } catch (error) {}
      }
    };
    const getProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/product/getall`,
          {
            method: "GET",
          }
        );

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
    const func=(id)=>{
      setCategory(id)
      setIsModalOpen(true)

    }
    useEffect(() => {
      getCategories();
    },[]);
  return (
    <div>
      <div className="justify-center  overflow-auto my-10 flex gap-10">
        <span className="text-5xl  font-serif underline">Products</span>
        <select
          className="w-32 h-10 rounded-lg px-2 mt-2 outline-none text-xl border border-black bg-gray-100 placeholder-black"
          onChange={(e) => {
            settype(e.target.value);
          }}
        >
          <option value="All">All</option>
          {categories?.map((c) => (
            <option value={c._id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-center my-10">
        <button
          onClick={() => setIsProductModalOpen(true)}
          className="p-2 bg-purple-600 text-xl rounded-lg text-white border border-black hover:bg-purple-700 "
        >
          Create
        </button>
      </div>
      <div className="flex justify-center flex-wrap m-10">
        {products?.map((p) =>
          type === "All" ? (
            
              <Link
                to={`/product/${p._id}`}
                key={p._id}
                className="flex flex-col gap-5 border border-gray-500 rounded-lg p-5  my-10 mx-20 w-60 "
              >
                <div className=" flex justify-center">
                  <img src={p.photo} alt="image" className="h-44" />
                </div>
                <div className="flex flex-col gap-2 pt-2 ">
                  <span className="text-2xl text-center">{p.name}</span>
                  <span className="text-center text-xl">from ${p.price}</span>
                </div>
              </Link>
            
          ) : type === p.category ? (
            
              <Link
                to={`/product/${p._id}`}
                key={p._id}
                className="flex flex-col  border border-gray-500 rounded-lg p-5 mx-20 w-60"
              >
                <div className=" flex justify-center">
                  <img src={p.photo} alt="image" className="h-44" />
                </div>
                <div className="flex flex-col gap-2 pt-2 ">
                  <span className="text-2xl text-center">{p.name}</span>
                  <span className="text-center text-xl">from ${p.price}</span>
                </div>
              </Link>
            
          ) : (
            <></>
          )
        )}
      </div>
      <Modal
        title="Select Category"
        open={isProductModalOpen}
        onOk={() => setIsProductModalOpen(false)}
        onCancel={() => setIsProductModalOpen(false)}
        footer={null}
      >
        <div className="flex flex-wrap justify-center items-center">
          {categories?.map((c) => (
            <div
              key={c._id}
              onClick={() => func(c._id)}
              className="shadow-xl cursor-pointer  transition ease-in-out border border-black  w-32 h-12 text-2xl flex rounded-2xl  bg-gray-100 justify-center items-center  m-10 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-300 duration-300   "
            >
              <div>{c.name}</div>
            </div>
          ))}
        </div>
      </Modal>
      <Modal
        title="Create a new Product"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <form onSubmit={handleproductsubmit}>
          <div className="flex flex-col items-center ">
            <label>
              <div className="px-1 pb-1 font-bold">Name:</div>
              <input
                className="w-72  h-10 px-5 rounded-xl border border-black bg-gray-100 "
                type="text"
                placeholder="Enter the name of new product"
                required="required"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="flex flex-col items-center ">
            <label>
              <div className="px-1 pt-5 pb-1 font-bold">Description:</div>
              <textarea
                className="w-72  px-5 pt-4 rounded-xl border border-black bg-gray-100  "
                type="text"
                placeholder="Description"
                required="required"
                value={desc}
                onChange={(e) => setdesc(e.target.value)}
              />
            </label>
          </div>
          <div className="flex flex-col items-center m-5">
            <label>
              <div className="px-1 pb-1 font-bold">Price:</div>
              <input
                className="w-72  h-10 p-5 rounded-xl border border-black bg-gray-100 "
                type="number"
                placeholder="Price"
                required="required"
                value={price}
                onChange={(e) => setprice(e.target.value)}
              />
            </label>
          </div>
          <div className="flex flex-col items-center m-5">
            <label>
              <div className="px-1 pb-1 font-bold">Quantity:</div>
              <input
                className="w-72  h-10 p-5 rounded-xl border border-black bg-gray-100 "
                type="number"
                placeholder="Quantity"
                required="required"
                value={stock}
                onChange={(e) => setstock(e.target.value)}
              />
            </label>
          </div>

          <div className="flex flex-col items-center m-5">
            <label>
              <div className="px-1 pb-1 font-bold">Min value of stock:</div>
              <input
                className="w-72  h-10 p-5 rounded-xl border border-black bg-gray-100 "
                type="number"
                placeholder="Minimum value of stock"
                required="required"
                value={min}
                onChange={(e) => setmin(e.target.value)}
              />
            </label>
          </div>

          <div className="flex flex-col items-center m-5">
            {
              uploadPhoto?
              <>
              <img src={uploadPhoto} alt="photo" className="h-12" />
              </>:<></>
            }
            <label htmlFor="profile_pic">
              <div className="px-1 pb-1 font-bold">Photo :</div>

              <div className="w-72 h-10  px-5 pt-2 flex justify-between rounded-xl border border-black bg-gray-100">
                <p className="flex justify-center">
                  {uploadPhoto ? "Uploaded" : "Upload profile photo"}
                </p>
              </div>
            </label>

            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
              onChange={handleUploadPhoto}
            />
          </div>

          <div className="flex flex-col items-center m-5">
            <button
              type="submit"
              className="bg-purple-800 p-5  text-white w-24 hover:bg-white hover:text-black py-2 rounded-xl border border-black"
            >
              Create 
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Products;
