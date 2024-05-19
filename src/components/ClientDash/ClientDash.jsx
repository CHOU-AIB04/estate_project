import React from 'react'
import { useContext } from 'react';
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UserInfo } from '../../context/logcontext';
const ClientDash = () => {
    let {setislogged} = useContext(UserInfo)
    const LogOut = ()=>{
        window.sessionStorage.removeItem("token");
        setislogged(false)
    }
  return (
    <>
        <header className='h-[60px] flex items-center justify-around sh'>
            <Link to="/ClientDash">
                <h1 className='text-violet-900 text-[16px] sm:text-[30px] font-bold'>ClientDash.</h1>
            </Link>
            <div className='flex items-center gap-5'>
                <Link to="/">
                    <button className='w-[100px] sm:w-[130px] text-[12px] md:text-[15px] h-9 bg-white border border-violet-900 rounded-md text-violet-900 flex items-center justify-center gap-3' onClick={LogOut}>Log Out <CiLogout size={20}/></button>
                </Link>
                <Link to="/" relative='.'>
                    <button className='w-[100px] sm:w-[130px] text-[12px] md:text-[15px] h-9 bg-white border border-violet-900 rounded-md text-violet-900 flex items-center justify-center gap-3' >Home <FaHome size={20}/></button>
                </Link>
            </div>
        </header>
        <section className='grid grid-cols-4 h-14 gap-1'>
            {/* <Link to="/ClientDash">
                <div className='text-[9px] md:text-[16px] w-full h-full font-bold flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 bg-violet-900 text-white rounded-md hover:bg-white hover:text-violet-900 transition-colors duration-300 cursor-pointer'>
                    <p>User_Info</p>
                    <FaRegUser size={20}/>
                </div>
            </Link> */}
            <Link to="/ClientDash">
            <div className='text-[9px] md:text-[16px] w-full h-full font-bold flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 bg-violet-900 text-white rounded-md hover:bg-white hover:text-violet-900 transition-colors duration-300 cursor-pointer'>
                <p>Add_Annoucement</p>
                <GrAnnounce size={20}/>
            </div>
            </Link>
            <Link to="/ClientDash/Allannouce">
                <div className='text-[9px] md:text-[16px] w-full h-full font-bold flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 bg-violet-900 text-white rounded-md hover:bg-white hover:text-violet-900 transition-colors duration-300 cursor-pointer'>
                    <p>All_Annoucements</p>
                    <GrAnnounce size={20}/>
                </div>
            </Link>
            <Link to="/ClientDash/AllOffers">
                <div className='text-[9px] md:text-[16px] w-full h-full font-bold flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 bg-violet-900 text-white rounded-md hover:bg-white hover:text-violet-900 transition-colors duration-300 cursor-pointer'>
                    <p>All_Offers</p>
                    <MdLocalOffer size={20}/>
                </div>
            </Link>
            <Link to="/ClientDash/Response">
                <div className='text-[9px] md:text-[16px] w-full h-full font-bold flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 bg-violet-900 text-white rounded-md hover:bg-white hover:text-violet-900 transition-colors duration-300 cursor-pointer'>
                    <p>Client_Response</p>
                    <RiQuestionAnswerFill size={20}/>
                </div>
            </Link>
        </section>
        <Outlet />
    </>
  )
}

export default ClientDash