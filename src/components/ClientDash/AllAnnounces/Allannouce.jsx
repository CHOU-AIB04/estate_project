import React from 'react'
import { Link } from 'react-router-dom'
import house from "../../../assets/img/houses/house1lg.png"
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { SlSizeActual } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { useContext } from 'react';
import { UserInfo } from '../../../context/logcontext';
import axios from 'axios';
import toast from 'react-hot-toast';
const Allannouce = () => {
    // share the user info 
    let {PersonalInfo,setPersonalInfo,UserAnoucement,setUserAnoucement,UserOffer,setUserOffer,ClientResponse,setClientResponse,encryptId,decryptId,secretKey,count,setcount,islogged,setislogged} = useContext(UserInfo)
    const DeleteAnnouce = (id)=>{
      axios.get(`http://localhost/MY_PROJECTS/estate_project/AddAnnoucement.php?Id=${parseInt(id)}`).then((res)=>{
        toast.success("Annoucement is deleted succesfuly !!")
        setcount(count === 0 ? 1 : 0)
      })
    }
    return (
    <>
    {
       UserAnoucement.length !== 0 ?

     <section className='mt-10 pb-10  w-[90%] relative h-auto left-1/2 -translate-x-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>     
      {
        UserAnoucement.map((house)=>{
          return(
            <>
              <nav key={house.App_Id} className='w-full pl-4 pt-2 back space-y-3 h-[550px] radius pb-8'>
                      <Link to={`/propertyDetails/1`}>
                        <div className='h-[65%] w-[95%]  radius_pic overflow-hidden'>
                          <img src={`http://localhost/MY_PROJECTS/estate_project/assets/${house.Picture}`} alt="pic" className='object-cover w-full h-full cursor-pointer' />
                        </div>
                      </Link>
                      <div className='space-y-3'>
                        <div className='flex items-center gap-5'>
                            <p className='bg-green-500 grid place-content-center p-1 rounded-md text-white'>{house.Type}</p>
                            <p className='bg-violet-500 grid place-content-center p-1 rounded-md text-white'>{house.Nom}</p>
                        </div>
                        <h1 className='font-bold '>{house.Adresse}</h1>
                        <div className='flex items-center gap-8'>
                          <p className='flex items-center gap-3 text-zinc-600'> <span><FaBed/></span> {house.Bathrooms}</p>
                          <p className='flex items-center gap-3 text-zinc-600'> <span><FaBath /></span> {house.Bedrooms}</p>
                          <p className='flex items-center gap-3 text-zinc-600'> <span><SlSizeActual /></span> {house.Surface} m²</p>
                        </div>
                        <h2 className='text-violet-900'>$ {house.Price}</h2>
                        <button onClick={()=>DeleteAnnouce(house.App_Id)} className='w-[120px] h-9 bg-white border border-violet-900 rounded-md text-violet-900 flex items-center justify-center gap-3' >Delete <MdDelete /></button>
                      </div>
                    </nav>
                </>
                )
          }) 
        }      
      </section> : 
      <>
        <h1 className='mt-10 text-violet-900 text-sm sm:text-[20px] text-center'>No Annoucement Yet </h1>
      </>            
      }
    </>
  )
}

export default Allannouce