import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import uploadFile from '../../helper/upload'

const SingleProduct = () => {
    const navigate=useNavigate()
    const search=useParams()
    const[product,setproduct]=useState()
    const[isModalOpen,setIsModalOpen]=useState(false)
      const [auth, setAuth] = useAuth();
    const [uploadPhoto, setUploadPhoto] = useState("");
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState();
    const [name, setName] = useState('');
    const [price, setprice] = useState("");
    const [stock, setstock] = useState("");
    const [min, setmin] = useState("");
   
    const [desc, setdesc] = useState("");
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
   useEffect(() => {
     getCategories();
   });
    const getCategory = async (id) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/category/get/${id}`,
          {
            method: "GET",
          }
        );

        const res = await response.json();

        if (response.ok) {
          setCategory(res.category);
          
        } else {
          toast.error(res.message);
        }
      } catch (error) {}
    };
    useEffect(() => {
      getProduct();
     
    }, []);
     const handlephoto = async (e) => {
       const file = e.target.files[0];

       const xyz = await uploadFile(file);

       setUploadPhoto(xyz?.url);
     };
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
            setName(res.product.name);
            setdesc(res.product.description);
            setprice(res.product.price);
            setstock(res.product.stock);
            setmin(res.product.min);
            getCategory(res.product.category);
            setUploadPhoto(res.product.photo)
          } else {
            toast.error(res.message);
          }
        } catch (error) {}
      };
      useEffect(() => {
        getProduct();
        
      }, []);
      const func=(id)=>{
        getCategory(id)
        setIsModalOpen(false)
      }
       const dlt = async (id) => {
         try {
           const response = await fetch(
             `http://localhost:3000/api/product/delete/${id}`,
             {
               method: "DELETE",
               headers: {
                 Authorization: auth?.token,
               },
             }
           );
           if (response.ok) {
             toast.success("Deleted successfully");
            navigate('/products')
           }
         } catch (error) {
           console.log(error);
         }
       };
      const update= async (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (stock < 0 || min < 0 || price < 0) {
        toast.error("Price or stock or minimum value can not be less than 0");
      } else {
        try {
          console.log(categories);
          const response = await fetch(
            `http://localhost:3000/api/product/update/${search.id}`,
            {
              method: "PUT",
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
         
            setIsModalOpen(false)
            setName("");
            setCategory("");
            setdesc("")
            setprice("");
            setUploadPhoto("");
            setstock("");
            setmin("");
          getProduct()
          } else {
            toast.error(res.error);
          }
        } catch (error) {}
      }
    };
  return (
    <div>
      <div className="flex  gap-20 m-10">
        <form className="flex flex-col  w-[500px] gap-10 items-center">
          <img src={uploadPhoto} alt="" className="h-96  " />
          <label htmlFor="profile_pic">
            <span className="bg-blue-600 p-5  text-white text-xl hover:bg-white hover:text-black py-2 rounded-xl border border-black">
              Change Photo
            </span>
          </label>

          <input
            type="file"
            id="profile_pic"
            name="profile_pic"
            className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
            onChange={handlephoto}
          />
        </form>
        <div>
          <div className="flex flex-col items-center ">
            <div className="px-1 pb-1 font-bold">{category?.name}</div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-black rounded-xl w-72 h-10 px-5 bg-gray-100 "
            >
              Change category
            </button>
          </div>
          <form onSubmit={update}>
            <div className="flex flex-col items-center ">
              <label>
                <div className="px-1  pt-5  pb-1 font-bold">Name:</div>
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
            <div className="flex justify-between m-5">
              <button
                type="submit"
                className="bg-blue-600 p-5  text-white w-24 hover:bg-white hover:text-black py-2 rounded-xl border border-black"
              >
                Save
              </button>
              <button
                onClick={() => dlt(product?._id)}
                className="bg-red-600 p-5  text-white w-24 hover:bg-white hover:text-black py-2 rounded-xl border border-black"
              >
                Delete
              </button>
            </div>
          </form>

          <div>created by</div>
        </div>
      </div>
      <Modal
        title="Select Category"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div className="flex flex-wrap justify-center items-center">
          {categories?.map((c) => (
            <div
              key={c._id}
              onClick={() => func(c._id)}
              className={`shadow-xl cursor-pointer  transition ease-in-out border border-black  w-32 h-12 text-2xl flex rounded-2xl  bg-gray-100 justify-center items-center  m-10   ${
                c._id === category?._id
                  ? `bg-indigo-300`
                  : `hover:bg-indigo-300 duration-300 hover:-translate-y-1 hover:scale-110`
              }  `}
            >
              <div>{c.name}</div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

export default SingleProduct
