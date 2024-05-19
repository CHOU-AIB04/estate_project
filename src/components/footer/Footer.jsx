import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
const Footer = () => {
  return(
    <footer className='w-full h-20 mt-10 flex flex-col items-center justify-around'>
      <div className='flex items-center gap-10'>
        <FaFacebook size={30} className="text-violet-700"/>
        <FaInstagram size={30} className="text-violet-700"/>
        <FaXTwitter size={30} className="text-violet-700"/>
        <FaTiktok size={30} className="text-violet-700"/>
      </div>
      <p className='text-[10px] lg:text-md'>Copyright @2024 all Right are reserved  <span className='font-bold text-violet-700'> Designed by :<span className='text-sm sm:text-xl text-black'> ZAKARIA</span></span></p>
    </footer>
  );
};

export default Footer;
