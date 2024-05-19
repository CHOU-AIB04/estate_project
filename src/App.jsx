import React from "react";
import Auth from "./components/auth/Auth";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/Home/Home";
import PropertyDetails from "./components/PropertyDetails/PropertyDetails";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {Toaster,toast} from "react-hot-toast"
import { authcontext, UserInfo } from "./context/logcontext";
import { useState } from "react";
import ClientDash from "./components/ClientDash/ClientDash";
import AddAnnouce from "./components/ClientDash/AddAnnounce/AddAnnouce";
import Allannouce from "./components/ClientDash/AllAnnounces/Allannouce";
import AllOffers from "./components/ClientDash/AllOffers/AllOffers";
import Response from "./components/ClientDash/ClientResponse/Response";
import axios from "axios"
import CryptoJS from 'crypto-js';
import { useEffect } from "react";


const App = () => {
  let [islogged,setislogged] = useState(false)
  const navigate = useNavigate()
  // this function for decrypte an id comming from the database to be able to store it
  // Function to encrypt the ID

  const secretKey = "12AZ34ER56TY"
  const encryptId = (id, secretKey) => {
  const encrypted = CryptoJS.AES.encrypt(id, secretKey).toString();
  return encrypted;
  };

  // function for decypte the id from session storage

  const decryptId = (encrypted, secretKey) => {
    const decrypted = CryptoJS.AES.decrypt(encrypted, secretKey).toString(CryptoJS.enc.Utf8);
    return decrypted;
  };
  // here i neec i use effect throught i need to do an axios api with get methode to get all user data using his id from session storage
  // first i need to create a usestate for updating his value to reexecute the useeffect again
  let [count,setcount] = useState(0)
  let currentpath = useLocation()
                        // let's create 4 usestate for all user info 

  /**----------the fisrt usestate  for personal user info   */
  let [PersonalInfo,setPersonalInfo] = useState([]);

  /**----------the second usestate  for user Annoucement  */
  let [UserAnoucement,setUserAnoucement] = useState([]);

    /**----------the third usestate  for user Offer  */
  let [UserOffer,setUserOffer] = useState([]);

  
    /**----------the fourth usestate  for Client response  */
    let [ClientResponse,setClientResponse] = useState([]);
                      // create usestate to get allannoucement from database
  let [AllAnnounces,setAllAnnounces] = useState(()=>{
    const Data = window.localStorage.getItem("houses");
    return Data ? JSON.parse(Data) : []
  })
    // this variable for storing data comming from database to do filter
    const [Filter,setFilter] = useState([]);
  useEffect(() => {
    if (window.sessionStorage.getItem("token")) {
      const Id = window.sessionStorage.getItem("token");
      try {
        const Iddecryte = decryptId(Id, secretKey);
        axios.get(`http://localhost/MY_PROJECTS/estate_project/auth?id=${Iddecryte}`).then((res) => {
          if (res.data !== false) {
            setPersonalInfo(res.data[0])
            setUserAnoucement(res.data[1])
            setUserOffer(res.data[2])
            setClientResponse(res.data[3])
            setislogged(true)
           
          } else {
            window.sessionStorage.removeItem("token");
            navigate("/auth");
          }
        });
      } catch (error) {
        console.error("Error decrypting ID:", error);
        // Handle decryption error, e.g., log the error or show a message to the user
      }
    }
    axios.get("http://localhost/MY_PROJECTS/estate_project/Annoucement.php").then((res)=>{
      setAllAnnounces(res.data)
      setFilter(res.data)
      window.localStorage.setItem("houses",JSON.stringify(res.data))
    })

  }, [count]);
  
                          // this useState is for switching between log in and sign up in the Auth component

  let [switchform, setswitchform] = useState(0);

  // this specificpath variable for display the header and footer conponenets if the current not exist in the specificpath variable 
  const specificpath = ["/auth","/ClientDash","/ClientDash/Allannouce","/ClientDash/AllOffers","/ClientDash/Response","/ClientDash/AddAnnouce"]

  useEffect(()=>{
    const securepath = ["/ClientDash","/ClientDash/Allannouce","/ClientDash/AllOffers","/ClientDash/Response","/ClientDash/AddAnnouce"]
    if (securepath.includes(currentpath.pathname) && window.sessionStorage.length === 0) {
      navigate("/auth")
    }
  },[currentpath.pathname])


   // this function for ocnfirming that all field are not empty in a specific
  const Formconfirmation = (formData)=>{
    let check = 0
      Object.keys(formData).map((input)=>{
          let current = formData[input]
          if (current === "") {
              toast.error(`the ${input} field is required`)
          }else{
              check++
          }
      })
    return check
  }
// this function for handling change for inputs field
  const Handlechange = (event,setFormData,FormData)=>{
    let {tagName,name,value}  = event.target
    // handle the input type 
    if (tagName === "INPUT") {
      let {type} = event.target
      if (type !== "file") {
        setFormData({...FormData,[name]:value}) 
      }else{
          let {files} = event.target
          setFormData({...FormData,[name]:files[0]})
      }
    }else{
      setFormData({...FormData,[name]:value})
    }
  }
  return (
    <>
    <UserInfo.Provider value={{PersonalInfo,setPersonalInfo,UserAnoucement,setUserAnoucement,UserOffer,setUserOffer,ClientResponse,setClientResponse,encryptId,decryptId,secretKey,count,setcount,islogged,setislogged,AllAnnounces,setAllAnnounces,Filter}}>
       <authcontext.Provider value={{ switchform, setswitchform,Formconfirmation,Handlechange}}>
        <Toaster position="top-right"/>
         {
          !specificpath.includes(currentpath.pathname) ? <Header /> : <></>
         }
          
          <Routes>
            <Route index element={<Home />} />
            <Route path="/propertyDetails" element={<PropertyDetails />} />
            <Route path="/ClientDash" element={<ClientDash />}>
                {/* <Route path="" element={<Info />} /> */}
                <Route path="" element={<AddAnnouce />}/>
                <Route path="Allannouce" element={<Allannouce />}/>
                <Route path="AllOffers" element={<AllOffers />}/>
                <Route path="Response" element={<Response />}/>
            </Route>
            <Route path="/auth" element={<Auth />} />
          </Routes>
          {
            !specificpath.includes(currentpath.pathname) ? <Footer /> : <></>
          }
      </authcontext.Provider>
    </UserInfo.Provider>
     
    </>
  );
};

export default App;
