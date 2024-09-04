import React from 'react'

const Footer = () => {
  return (
    <div className="bg-black  ">
      <div className="flex justify-between px-10 py-10 text-xl  text-white ">
        <div className="flex gap-3 ">
          <div className="">© 2024</div>
          <div className="hover:underline">General Store™</div>. All Rights
          Reserved.
        </div>
        <div className="flex gap-10 text-xl pr-10 text-white">
          <div className='hover:underline"'>About us</div>
          <div className='hover:underline"'>Contact us</div>
          <div className='hover:underline"'>FAQs</div>
        </div>
      </div>
    </div>
  );
}

export default Footer
