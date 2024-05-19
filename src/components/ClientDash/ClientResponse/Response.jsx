import React from 'react'
import { MdCancel } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import house from "../../../assets/img/houses/house1lg.png"
import { useContext } from 'react';
import { UserInfo } from '../../../context/logcontext';
const Response = () => {
        // share the user info 
        let {PersonalInfo,setPersonalInfo,UserAnoucement,setUserAnoucement,UserOffer,setUserOffer,ClientResponse,setClientResponse,encryptId,decryptId,secretKey,count,setcount,islogged,setislogged} = useContext(UserInfo)
  return (
   <>
   {
    ClientResponse.length !== 0 ?
        <article className='w-[95%] md:w-[85%] lg:w-[70%] mt-10 relative left-1/2 -translate-x-1/2 flex flex-col gap-4'>
            <h1 className='text-violet-900 text-[16px] sm:text-[30px] font-bold'>Response.</h1>
            {
                ClientResponse.map((res)=>{
                    return(
                        <>
                            <section className='space-y-3' key={res.Id}>
                                <nav className='w-full min-h-28 sm:min-h-36 max-h-40  back flex gap-5'>
                                    <div className='h-[100px] md:h-[144px] w-[200px]  overflow-hidden'>
                                        <img src={house} alt="pic" className='h-full w-full object-cover' />
                                    </div>
                                    <div className='space-y-1'>
                                        <h1 className='text-[12px] sm:text-[16px] font-bold'>Offer : </h1>
                                        <p className='text-[10px] sm:text-[13px]'>{res.Offer}</p>
                                        {
                                            res.Accepted === null ? <button className="text-red-500 bg-white shadow-sm shadow-red-500 w-[100px] rounded-md h-7 text-sm"> In Progress</button> : 
                                            res.Accepted === 0 ? 
                                            <button className="text-red-500 bg-white shadow-sm shadow-red-500 w-[100px] rounded-md h-7 text-sm">Refused</button> :
                                            <button className="text-green-500 bg-white shadow-sm shadow-green-500 w-[100px] rounded-md h-7 text-sm">Accepted</button>
                                        }
                                    </div>
                                </nav>
                            </section>
                        </>
                    )
                })
            }
        </article>
        :
        <>
        <h1 className='test-sm sm:text-[20px] text-violet-900 mt-10 text-center'>No Offer Yet !!</h1>
        </>
   }
   </>
  )
}

export default Response