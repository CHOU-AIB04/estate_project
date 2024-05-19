import React from 'react';
import pic1 from '../../assets/img/house-banner.png'
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaHouseChimney } from "react-icons/fa6";
import { GiPriceTag } from "react-icons/gi";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { SlSizeActual } from "react-icons/sl";
import house from "../../assets/img/houses/house1lg.png"
import { housesData } from '../../data';
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { authcontext, UserInfo } from '../../context/logcontext';
import { useState } from 'react';
import { useEffect } from 'react';
const Home = () => {
  let {PersonalInfo,setPersonalInfo,UserAnoucement,setUserAnoucement,UserOffer,setUserOffer,ClientResponse,setClientResponse,encryptId,decryptId,secretKey,count,setcount,islogged,setislogged,AllAnnounces,setAllAnnounces,Filter} = useContext(UserInfo)
  let {Handlechange} = useContext(authcontext)

  let [filter,setfilter] = useState({
    localisation : "Canada",
    type : "House",
    price  : "0,40000",
  })
  const StoreId = (id)=>{
      window.localStorage.setItem("Id",id)
  }
  // this function for handling change in filter input
  const HandleFilter = (event)=>{
    Handlechange(event,setfilter,filter);
  }
  // this function for handling the search button click
  const HandleClick = ()=>{
      const localisation = filter.localisation
      const Type = filter.type
      const price1 = parseInt(filter.price.split(",")[0])
      const price2 = parseInt(filter.price.split(",")[1])
      const NewArray = Filter.filter((annouce)=> annouce.Nom.toLowerCase() === localisation.toLowerCase() && annouce.Type.toLowerCase() === Type.toLowerCase() && parseInt(annouce.Price) >= price1 && parseInt(annouce.Price) <= price2 )
      setAllAnnounces(NewArray)
  }
  return (
    <>
    {/* this first section for service presentation */}
      <section className='mt-10 w-full h-auto flex flex-col md:flex-row items-center justify-start md:justify-between gap-10 md:gap-0 '>
        <div className='w-[90%] md:w-[40%] ml-0 md:ml-14'>
          <h1 className='font-bold text-[30px] md:text-[35px] w-full lg:w-[90%] '><span className='text-violet-900'>Buy</span> Your Dream House With Us</h1>
          <p>Powerful self-serve product and growth analytics to help you convert engage and retoin more.</p>
        </div>
        <div>
          <img src={pic1} alt="pic1" className='w-[350px] md:w-[500px] mr-0 md:mr-3'/>
        </div>
      </section>
      {/* the filter section */}
      <section className='w-[90%] relative left-1/2 -translate-x-1/2 back h-auto pt-4 pb-4 pl-2 -mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-5'>
        <div className='w-[95%] h-16 sh  flex items-center justify-center gap-3 rounded-md'>
        <FaLocationDot size={20} className="text-violet-900"/>
          <div className='w-[80%]'>
            <select name="localisation" value={filter.localisation} id="place" className='w-full bg-transparent' onChange={HandleFilter}>
              <option value="Canada">Canada</option>
              <option value="United States">United States</option>
            </select>
            <p className='text-[14px]'>Select your place</p>
          </div>
        </div>
        <div className='w-[95%] h-16 sh flex items-center justify-center gap-3 rounded-md'>
        <FaHouseChimney size={20} className="text-violet-900"/>
          <div className='w-[80%]'>
            <select name="type" id="type" value={filter.type} className='w-full bg-transparent' onChange={HandleFilter}>
              <option value="House">House</option>
              <option value="Apartament">Apartament</option>
            </select>
            <p className='text-[14px]'>Choose property type</p>
          </div>
        </div>
        <div className='w-[95%] h-16 sh flex items-center justify-center gap-3 rounded-md'>
        <GiPriceTag size={20} className="text-violet-900"/>
          <div className='w-[80%]'>
            <select name="price" id="price" value={filter.price} className='w-full bg-transparent' onChange={HandleFilter}>
              <option value="0,40000">0$-40 000$</option>
              <option value="40000,100000">40 000$-100 000$</option>
              <option value="100000,200000">100 000$-200 000$</option>
              <option value="200000,300000">200 000$-300 000$</option>
            </select>
            <p className='text-[14px]'>Choose price range</p>
          </div>
        </div>
        <button className='w-[160px] h-14 bg-violet-900 text-white grid place-content-center rounded-md' onClick={HandleClick}>
          <FaSearch size={20}/>
        </button>
      </section>
      {/* the appartement and houses section */}
      {
        AllAnnounces.length !== 0 ?
        <section className='mt-10  w-[90%] relative h-auto left-1/2 -translate-x-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
          {
            AllAnnounces.map((house)=>{
              return(
                <nav key={parseInt(house.App_Id)} className='w-full pl-4 pt-2 back space-y-3 h-[550px] radius pb-4'>
                  <Link to={`/propertyDetails`} onClick={()=>StoreId(parseInt(house.App_Id))}>
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
                      <p className='flex items-center gap-3 text-zinc-600'> <span><FaBed/></span> {house.Bedrooms}</p>
                      <p className='flex items-center gap-3 text-zinc-600'> <span><FaBath /></span> {house.Bathrooms}</p>
                      <p className='flex items-center gap-3 text-zinc-600'> <span><SlSizeActual /></span> {house.Surface}</p>
                    </div>
                    <h2 className='text-violet-900'>$ {house.Price}</h2>
                  </div>
              </nav>
              )
            })
          }
        </section>
       : <h1 className='mt-10 text-violet-900 font-bold text-sm sm:text-[20px] text-center'>No Annoucement Yet !!</h1>
      } 
    </>
  );
};

export default Home;
