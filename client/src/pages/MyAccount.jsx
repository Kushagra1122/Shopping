import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth';
import { Modal } from 'antd';

const MyAccount = () => {
 const [isModalOpen, setIsModalOpen] = useState(false);
      const [user, setuser] = useState();
        const [name, setname] = useState('');
        const [auth, setAuth] = useAuth();
        const [email, setemail] = useState('');
         const [pincode, setpincode] = useState("");
          const [address, setaddress] = useState("");
      const getUser = async () => {
       
       if (auth.user!==null){
  try {
    const response = await fetch(
      `http://localhost:3000/api/auth/get/${auth.user._id}`,
      {
        method: "GET",
      }
    );

    const res = await response.json();

    if (response.ok) {
      setuser(res.user);
      setname(res.user.name)
      setemail(res.user.email)
      setaddress(res.user.address)
      setpincode(res.user.pincode)
    } else {
      toast.error(res.message);
    }
  } catch (error) {}
}
 
        
       
      };
     
      useEffect(()=>{
        getUser()
      })
     
  return (
    <div>
      <div>
        <form className="flex flex-col  gap-10 m-10 items-center ">
          <input
            type="text"
            placeholder="Name"
            className="outline-none text-lg w-80 flex gap-5 border rounded-lg border-black bg-gray-100 p-2"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="outline-none text-lg w-80 flex gap-5 border rounded-lg border-black bg-gray-100 p-2"
            disabled
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            className="outline-none text-lg w-80 flex gap-5 border rounded-lg border-black bg-gray-100 p-2"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
          />
          <input
            type="number"
            placeholder="Pincode"
            className="outline-none text-lg w-80 flex gap-5 border rounded-lg border-black bg-gray-100 p-2"
            value={pincode}
            onChange={(e) => setpincode(e.target.value)}
          />

          <div className=" flex justify-between w-80 items-center h-12">
            <div
              onClick={() => setIsModalOpen(true)}
              className="text-blue-600 underline"
            >
              Change password?
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-xl px-4 py-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <Modal
        title="Change password"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <form className="flex   flex-col gap-4">
          <input
            type="password"
            placeholder="old password"
            className="border-b py-2 border-gray-500 mt-2 outline-none"
          />
          <input
            type="password"
            placeholder="new password"
            className="border-b py-2 border-gray-500 outline-none"
          />
          <input
            type="password"
            placeholder=" confirm Password"
            className="border-b py-2 border-gray-500  outline-none"
          />
          <button
            type="submit"
            className=" bg-red-500 text-white py-2 mt-5 hover:bg-red-600 rounded-lg"
          >
            Change password
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default MyAccount
