import { Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';

const Categories = () => {
  const[categories,setCategories]=useState()
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newcategory, setnewcategory] = useState();
    const [edit, setedit] = useState();
    const [editid, seteditid] = useState('');
   const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
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
   const handlesubmit = async (e) => {
     e.preventDefault();
     try {
      console.log(newcategory)
       const response = await fetch(
         `http://localhost:3000/api/category/create`,
         {
           method: "POST",
           headers: {
             Authorization: auth?.token,
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             name: newcategory,
           }),
         }
       );

       const res = await response.json();

       if (response.ok) {
         toast.success(res.message);
         setIsCategoryModalOpen(false);
         setnewcategory("");
         getCategories();
       } else {
         toast.error(res.error);
       }
     } catch (error) {}
   };
 const dlt = async (id) => {
   try {
     const response = await fetch(
       `http://localhost:3000/api/category/delete/${id}`,
       {
         method: "DELETE",
         headers: {
           Authorization: auth?.token,
         },
       }
     );
     if (response.ok) {
       toast.success("Deleted successfully");
       getCategories();
     }
   } catch (error) {
     console.log(error);
   }
 };
 const func=async(category)=>{
  setedit(category.name)
   setIsModalOpen(true)
   seteditid(category._id)
 }
 const Edit = async (e) => {
   e.preventDefault();
   try {
     const response = await fetch(
       `http://localhost:3000/api/category/update/${editid}`,
       {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
           Authorization: auth?.token,
         },
         body: JSON.stringify({ name: edit }),
       }
     );
     console.log(response);
     const res = await response.json();
     console.log(res);
     if (response.ok) {
       setIsModalOpen(false);
       seteditid('')
       toast.success("Updated successfully");
       getCategories();
     }
   } catch (error) {
     console.log(error);
   }
 };
  return (
    <div>
      <div className="text-center my-10 ">
        <span className="text-5xl  font-serif underline">Categories</span>
      </div>
      <div className="flex justify-center my-10">
        <button
          onClick={() => setIsCategoryModalOpen(true)}
          className="p-2 bg-purple-600 text-2xl rounded-lg text-white border border-black hover:bg-purple-700 "
        >
          Create
        </button>
      </div>
      <div>
        {categories?.map((c) => (
          <div
            key={c._id}
            className=" my-10 mx-40 flex  justify-center border-b border-black  h-16 items-center gap-96 "
          >
            <div className="flex justify-start w-32">
              <p className="text-3xl pt-5">{c.name}</p>
              <hr className="text-black" />
            </div>

            <div className=" flex justify-between gap-10 text-xl text-white">
              <button
                onClick={()=>func(c)}
                className="bg-blue-600 hover:bg-blue-800 p-2 border border-black rounded-xl"
              >
                Edit
              </button>
              <button
                onClick={() => dlt(c._id)}
                className="bg-red-600 p-2 border hover:bg-red-800 border-black rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        title="Create a new category"
        open={isCategoryModalOpen}
        onOk={() => setIsCategoryModalOpen(false)}
        onCancel={() => setIsCategoryModalOpen(false)}
        footer={null}
      >
        <form onSubmit={handlesubmit}>
          <div className="flex flex-col items-center ">
              <label>
              <div className='px-1 pb-1 font-bold'>Name:</div>
            <input
              className="w-72  h-10 px-5 rounded-xl border border-black bg-gray-100 "
              type="text"
              placeholder="Enter the name of new category"
              required="required"
              value={newcategory}
              onChange={(e) => setnewcategory(e.target.value)}
            />
            </label>
          </div>

          <div className="flex flex-col items-center m-5">
            <button className="bg-purple-800 p-5  text-white w-24 hover:bg-white hover:text-black py-2 rounded-xl border border-black">
              Create
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        title="Edit your category"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <form onSubmit={Edit}>
          <div className="flex flex-col items-center m-5">
            <input
              className="w-72  h-10 p-5 rounded-xl border border-black bg-gray-100 "
              type="text"
              required="required"
              value={edit}
              onChange={(e) => setedit(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-center m-5">
            <button className="bg-purple-800 p-5  text-white w-24 hover:bg-white hover:text-black py-2 rounded-xl border border-black">
              Update
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Categories
