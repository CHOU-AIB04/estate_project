import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { authcontext, UserInfo } from '../../../context/logcontext'

const AddAnnouce = () => {
    let navigate = useNavigate()
    // share the user info 
    let {PersonalInfo,setPersonalInfo,UserAnoucement,setUserAnoucement,UserOffer,setUserOffer,ClientResponse,setClientResponse,encryptId,decryptId,secretKey,count,setcount,islogged,setislogged} = useContext(UserInfo)
    let {Formconfirmation,Handlechange} = useContext(authcontext)
    let [AnnounceForm,setAnnounceForm] = useState({
        localisation : "Canada",
        type : "house",
        bedroom : "",
        bathroom : "",
        description : "",
        adresse : "",
        surface : "",
        date : "",
        prix : "",
        pic : ""
    })
    // this function for handle change
    const CreateaccountForm = (event)=>{
        Handlechange(event,setAnnounceForm,AnnounceForm)
      }
      // this function for createaccount confirmation
      const Createaccountconfirmation = (event)=>{
          event.preventDefault();
          const user_id = parseInt(PersonalInfo[0].Id)
          if (Formconfirmation(AnnounceForm) === 10) {
            const Data = new FormData()
            Data.append("localisation",AnnounceForm.localisation)
            Data.append("type",AnnounceForm.type)
            Data.append("bedroom",AnnounceForm.bedroom)
            Data.append("bathroom",AnnounceForm.bathroom)
            Data.append("description",AnnounceForm.description)
            Data.append("adresse",AnnounceForm.adresse)
            Data.append("surface",AnnounceForm.surface)
            Data.append("date",AnnounceForm.date)
            Data.append("prix",AnnounceForm.prix)
            Data.append("pic",AnnounceForm.pic)
            Data.append("User_id",user_id)
            axios.post("http://localhost/MY_PROJECTS/estate_project/AddAnnoucement.php",Data).then((res)=>{
                if (res.data) {
                    toast.success("Your Annouce is succesfuly added !!");
                    setcount(count === 0 ? 1 : 0);
                    navigate("/ClientDash/Allannouce");
                }
            })
          }
      } 
  return (
    <>
        <form className='w-[90%] flex gap-5 flex-col items-center relative left-1/2 -translate-x-1/2 mt-10' onSubmit={Createaccountconfirmation}>
            <nav className='grid grid-cols-1 md:grid-cols-2 gap-3 w-[90%] place-items-center'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">House Localisation</label>
                    <select name="localisation" id="place" className='h-10 rounded-md focus:outline-none pl-2 bg-transparent back w-[300px]' onChange={CreateaccountForm}>
                        <option value="Canada">Canada</option>
                        <option value="United States">United States</option>
                    </select>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Type</label>
                    <select name="type" id="" className='h-10 rounded-md focus:outline-none pl-2 bg-transparent back w-[300px]' onChange={CreateaccountForm}>
                        <option value="house">House</option>
                        <option value="Apartement">Apartement</option>
                    </select>
                </div>
            </nav>
            <nav className='grid grid-cols-1 md:grid-cols-2 gap-3 w-[90%] place-items-center'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Bedrooms</label>
                    <input type="number" name='bedroom'  className='h-10 rounded-md focus:outline-none pl-2 bg-transparent back w-[300px]' onChange={CreateaccountForm}/>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Bathrooms</label>
                    <input type="number" name='bathroom' className='h-10 rounded-md focus:outline-none pl-2 bg-transparent back w-[300px]' onChange={CreateaccountForm}/>
                </div>
            </nav>
            <nav className='grid grid-cols-1 gap-3 w-[73%] place-items-center'>
                <div className='flex flex-col gap-2 w-[300px] md:w-[620px] lg:w-full'>
                    <label htmlFor="">Description</label>
                    <textarea name="description" id="" className='min-h-20 max-h-32 pt-2 rounded-md focus:outline-none pl-2 bg-transparent back w-full' onChange={CreateaccountForm}></textarea>
                </div>
                <div className='flex flex-col gap-2 w-[300px] md:w-[620px] lg:w-full'>
                    <label htmlFor="">Adresse</label>
                    <textarea type="text" name='adresse' className='min-h-20 max-h-32 pt-2 rounded-md focus:outline-none pl-2 bg-transparent back w-full' onChange={CreateaccountForm}></textarea>
                </div>
            </nav>
           
            <nav className='grid grid-cols-1 md:grid-cols-2 gap-3 w-[90%] place-items-center'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Surface</label>
                    <input type="nmuber" name='surface' placeholder='in m²' className='h-10 rounded-md focus:outline-none pl-2 bg-transparent back w-[300px]' onChange={CreateaccountForm}/>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Year</label>
                    <input type="date" name='date' className='h-10 rounded-md focus:outline-none pl-2 bg-transparent back w-[300px]' onChange={CreateaccountForm}/>
                </div>
            </nav>
            <nav className='grid grid-cols-1 md:grid-cols-2 gap-3 w-[90%] place-items-center'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Price</label>
                    <input type="number" name='prix' className='h-10 rounded-md focus:outline-none pl-2 bg-transparent back w-[300px]' onChange={CreateaccountForm}/>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">Picture</label>
                    <input type="file" name='pic' className='h-10 rounded-md focus:outline-none pl-2 bg-transparent  w-[300px]' onChange={CreateaccountForm}/>
                </div>
            </nav>
            <div className='w-[80%] pl-10'>
            <button type='submit' className='w-[120px] h-9 bg-white border border-violet-900 rounded-md text-violet-900 self-start'>Announce</button>
            </div>
        </form>
    </>
  )
}

export default AddAnnouce