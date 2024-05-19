import React, { useContext } from 'react';
import house from "../../assets/img/houses/house1lg.png"
import user from "../../assets/img/agents/agent1.png"
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { SlSizeActual } from "react-icons/sl";
import { housesData } from '../../data';
import { useNavigate, useParams } from 'react-router-dom';
import { UserInfo } from '../../context/logcontext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useEffect } from 'react';
const PropertyDetails = () => {
  const navigate = useNavigate()
  let {PersonalInfo,setPersonalInfo,UserAnoucement,setUserAnoucement,UserOffer,setUserOffer,ClientResponse,setClientResponse,encryptId,decryptId,secretKey,count,setcount,islogged,setislogged,AllAnnounces,setAllAnnounces} = useContext(UserInfo)  
  const id = window.localStorage.getItem("Id")
  console.log(id)
  console.log(PersonalInfo)
  const clicked_element = AllAnnounces.filter((house)=> parseInt(house.App_Id) === parseInt(id))[0]
  // this function for sending the offer to the data base
  const MakeOffer = ()=>{
    const Offer = document.getElementById("offer").value
    if (Offer !== "") {
      if (PersonalInfo.length !== 0) {
        const Offer = document.getElementById("offer").value
        const Apartement_owner_id = parseInt(clicked_element.user_id);
        const user_id = parseInt(PersonalInfo[0].Id);
        const Apartement_id = parseInt(clicked_element.App_Id);
       if (Apartement_owner_id !== user_id) { 
          const Data = new FormData()
          Data.append("apartement_id",Apartement_id)
          Data.append("Offer_maker",user_id)
          Data.append("Offer",Offer)
          Data.append("Apartement_owner_id",Apartement_owner_id)
          axios.post("http://localhost/MY_PROJECTS/estate_project/Offer.php",Data).then((res)=>{
            if (res.data) {
              setcount(count === 0 ? 1 : 0);
              navigate("/")
              toast.success("Your Offer is Succesfuly Send to the Owner")
            }else{
              toast.error("you're already send your Offer")
            }
          })
       
        }
       else{
        toast.error("You can't Send An Offer to your Annouce")
       }
      }
      else{
        navigate("/auth")
        toast.error("you need to login first !!")
      }  
    }else{
      toast.error("the offer field in empty !!")
    }
    
  }
  return(
    <>
      <section className='mt-10  w-[90%] relative left-1/2 -translate-x-1/2 space-y-10'>
        <nav>
          {/* <h1 className='font-bold'>{clicked_element.Nom}</h1> */}
          <div className='flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0'>
            <p className='text-zinc-500 text-sm'>{clicked_element.Adresse}</p>
            <div className='flex items-center justify-between gap-3 w-full md:w-[40%]'>
              <div className='flex items-center gap-3 '>
                <p className='bg-green-500 grid place-content-center p-1 rounded-md text-white'>{clicked_element.Type}</p>
                <p className='bg-violet-500 grid place-content-center p-1 rounded-md text-white'>{clicked_element.Nom}</p>
              </div>
              <h1 className='text-violet-500 font-bold'>$ {clicked_element.Price}</h1>
            </div>
        </div>
        </nav>
        <nav className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <div className='col-span-1 md:col-span-2 w-full flex flex-col gap-0 md:gap-5 '>
              <div className='w-[90%] h-[400px] '>
                <img src={`http://localhost/MY_PROJECTS/estate_project/assets/${clicked_element.Picture}`} alt="" className='object-cover'/>
              </div>
              <div className='flex items-center gap-7 text-violet-800 mt-0 md:mt-10'>
                <p className='flex items-center gap-4'><FaBed /> {clicked_element.Bedrooms}</p>
                <p className='flex items-center gap-4'><FaBath /> {clicked_element.Bedrooms}</p>
                <p className='flex items-center gap-4'><SlSizeActual /> {clicked_element.Surface}</p>
              </div>
              <p>{clicked_element.Description}</p>
          </div>
          <div className='space-y-5'>
            <div className='flex items-center gap-4'>
              <div className='w-[50px] h-[50px] rounded-full bg-red-400'>
                <img src={user} alt="pic" className='w-full h-full object-cover'/>
              </div>
              <div className='space-y-1'>
                <h2 className='font-bold'>{clicked_element.Full_name}</h2>
                <p className='text-zinc-500'>{clicked_element.Nom}</p>
              </div>
            </div>
            <div className='w-[90%]  h-[200px] flex flex-col gap-7 pl-3 pt-3 rounded-md '>
              <textarea name="" id="offer" placeholder='make an offer' className="min-h-20 max-h-32 pt-2 pl-1 rounded-md bg-transparent border border-violet-800 focus:outline-none"></textarea>
              <button  className='w-[150px] h-10 bg-violet-900 text-white rounded-md' onClick={MakeOffer}>Make an offer</button>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default PropertyDetails;
