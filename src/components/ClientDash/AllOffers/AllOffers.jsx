import React from 'react'
import { MdCancel } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import house from "../../../assets/img/houses/house1lg.png"
import { useContext } from 'react';
import { UserInfo } from '../../../context/logcontext';
import axios from 'axios';
import toast from 'react-hot-toast';
const AllOffers = () => {
    let {PersonalInfo,setPersonalInfo,UserAnoucement,setUserAnoucement,UserOffer,setUserOffer,ClientResponse,setClientResponse,encryptId,decryptId,secretKey,count,setcount,islogged,setislogged} = useContext(UserInfo)
    // this function for Accepting an offer
    const Accept = ()=>{
        const Apartement_id = UserOffer[0].Appartement_Id;
        const Apartement_owner_id = UserOffer[0].Appartement_owner_id
        const Offer_maker = UserOffer[0].Offer_maker_id
        axios.get(`http://localhost/MY_PROJECTS/estate_project/Offer.php?accept=${1}&Apartement_id=${Apartement_id}&Apartement_owner_id=${Apartement_owner_id}&Offer_maker=${Offer_maker}`).then((res)=>{
           if (res.data) {
            toast.success("Offer Accepted !!")
            setcount(count === 0 ? 1 :0 )
           }
        })
    }
    // this function for Refusing an offer
    const Refuse = ()=>{
        const Apartement_id = UserOffer[0].Appartement_Id;
        const Apartement_owner_id = UserOffer[0].Appartement_owner_id
        const Offer_maker = UserOffer[0].Offer_maker_id
        axios.get(`http://localhost/MY_PROJECTS/estate_project/Offer.php?accept=${0}&Apartement_id=${Apartement_id}&Apartement_owner_id=${Apartement_owner_id}&Offer_maker=${Offer_maker}`).then((res)=>{
            if (res.data) {
                toast.success("Offer Refused !!")
                setcount(count === 0 ? 1 :0 )
               }
        })
    }
  return (
  <>
     {
        UserOffer.length !== 0  ?
        <article className='w-[95%] md:w-[85%] lg:w-[70%] mt-10 relative left-1/2 -translate-x-1/2 flex flex-col gap-4'>
            <h1 className='text-violet-900 text-[16px] sm:text-[30px] font-bold'>Offers.</h1>
            {
                UserOffer.map((offer)=>{
                    return(
                        <>
                            <section className='space-y-3' key={offer.Id}>
                                <nav className='w-full min-h-36 max-h-40  back flex gap-5'>
                                    <div className='h-[100px] md:h-[144px] w-[200px]  overflow-hidden'>
                                        <img src={`http://localhost/MY_PROJECTS/estate_project/assets/house1lg.png`} alt="pic" className='h-full w-full object-cover' />
                                    </div>
                                    <div className='space-y-1 sm:space-y-2'>
                                        <h1 className='text-[12px] sm:text-[16px] font-bold'>{offer.Full_name}</h1>
                                        <p className='text-[12px] sm:text-[15px]'>{offer.Offer}</p>
                                        {
                                            offer.Accepted === null ? 
                                            <div>
                                                <button onClick={Refuse}><MdCancel size={30} className="text-red-500 cursor-pointer"/></button>
                                                <button onClick={Accept}><GrStatusGood size={30} className="text-green-500 cursor-pointer"/></button>
                                            </div> : parseInt(offer.Accepted) === 1 ? <button className="text-green-500">Accepted</button> : <button className="text-red-500">Refused</button>
                                        }
                                        {
                                            parseInt(offer.Accepted) === 1 ? 
                                            <div>
                                                <h3 className='text-violet-900 test-sm'>Offer Maker Info</h3>
                                                <div className='flex items-center gap-4 '>
                                                    <p>country : <span className='text-violet-900'>{offer.Adresse}</span></p>
                                                    <p>Phone : <span className='text-violet-900'>{offer.Phone}</span></p>
                                                </div>
                                            </div> 
                                            : <></>
                                        }
                                    </div>
                                
                                </nav>
                            </section>
                        </>
                    )
                })
            }
        </article> 
        : <h1 className='mt-10 text-violet-900 text-sm sm:text-[20px] text-center'>No Offer Yet !!</h1> 

   }
  </>
  )
}

export default AllOffers