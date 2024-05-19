import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { authcontext, UserInfo } from "../../context/logcontext";
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  let navigate = useNavigate()
  let { switchform, setswitchform,Formconfirmation,Handlechange} = useContext(authcontext);
  const {setPersonalInfo,setUserAnoucement,setUserOffer,setClientResponse,encryptId,secretKey,setislogged} = useContext(UserInfo)
  // this usestate for create account form
  let [createform,setcreateform] = useState({
    name : "",
    phone : "",
    email : "",
    password : ""
  })
  // this usestate for login form 
  let [loginform,setloginform] = useState({
    email : "",
    password : ""
  })

  // this function for handling change in create account form 
  const CreateaccountForm = (event)=>{
    Handlechange(event,setcreateform,createform)
  }
  // this function for createaccount confirmation
  const Createaccountconfirmation = (event)=>{
      event.preventDefault();
      if(Formconfirmation(createform) === 4){
        const Form = new FormData()
        Form.append("name",createform.name)
        Form.append("phone",createform.phone)
        Form.append("email",createform.email.toLowerCase())
        Form.append("password",createform.password)
        axios.post("http://localhost/MY_PROJECTS/estate_project/auth",Form).then((res)=>{
          if(res.data){
            toast.error("Email already exist try another one");
          }else{
            toast.success("Account was created successfuly !");
            setswitchform(1);
          }
        })
      }
  }
  
  // this function for handling changing in login form inputs
  const LoginFormChange = (event)=>{
    Handlechange(event,setloginform,loginform);
  }

  // this function for handling the login form confirmation
  const LoginFormConfirmation = (event)=>{
    event.preventDefault();
    if (Formconfirmation(loginform) === 2) {
      const Form = new FormData();
      Form.append("email",loginform.email.toLowerCase());
      Form.append("password",loginform.password)
      axios.post("http://localhost/MY_PROJECTS/estate_project/auth",Form).then((res)=>{
        if (res.data !== false) {
          setPersonalInfo(res.data[0])
          setUserAnoucement(res.data[1])
          setUserOffer(res.data[2])
          setClientResponse(res.data[3])
          const Id = res.data[0][0].Id;
          window.sessionStorage.setItem("token",encryptId(Id,secretKey))
          setislogged(true)
          navigate("/")
          toast.success("welcome to HomeLand.!!")
          
          
        }else{
          toast.error("the email or password is incorrect try again !")
        }
        
      })
      
    }
  }
  return (
    <>
      <h1 className="text-violet-900 font-bold text-center mt-5 text-[40px]">HomeLand.</h1>
      <section className="w-[1/2] md:w-[850px] h-[450px]  absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-1 md:grid-cols-2 place-items-center md:place-content-start">
        <nav className="w-[370px] md:w-[500px] h-[400px] back log2_radius grid place-content-center overflow-hidden">
          {switchform === 0 ? (
            <>
              {/* create account form  */}
              <form className="w-full h-[400px]  flex flex-col justify-around" onSubmit={Createaccountconfirmation}>
                <h1 className="self-center font-bold text-violet-800 text-[20px]">
                  Create Account
                </h1>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Full Name</label>
                  <input type="text" name="name" className="h-10 rouded-md focus:outline-none pl-2 bg-transparent back w-[300px]" placeholder="User_name" onChange={CreateaccountForm}/>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Phone </label>
                  <input type="number" name="phone" className="h-10 rouded-md focus:outline-none pl-2 bg-transparent back w-[300px]" placeholder="Phone" onChange={CreateaccountForm}/>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Email</label>
                  <input type="Email" name="email" className="h-10 rounded-md focus:outline-none pl-2 bg-transparent back w-[300px]" placeholder="Email" onChange={CreateaccountForm}/>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Password</label>
                  <input type="password" name="password" className="h-10 rounded-md focus:outline-none pl-2 bg-transparent back w-[300px]" placeholder="Password" onChange={CreateaccountForm}/>
                </div>
                <button
                  type="submit"
                  className="w-[80px] sm:w-[120px] h-9 bg-violet-900 border border-white shadow-sm rounded-md text-white self-center"
                >
                  Sign Up
                </button>
              </form>
            </>
          ) : (
            <>
              {/* login form */}
              <form className="w-full h-[400px]  flex flex-col justify-around" onSubmit={LoginFormConfirmation}>
                <h1 className="self-center font-bold text-violet-800 text-[20px]">Sign In</h1>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Email</label>
                  <input type="Email" name="email" className="h-10 rounded-md focus:outline-none pl-2 bg-transparent back w-[300px]" placeholder="Email" onChange={LoginFormChange}/>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Password</label>
                  <input type="password" name="password" className="h-10 rounded-md focus:outline-none pl-2 bg-transparent back w-[300px]" placeholder="Password" onChange={LoginFormChange}/>
                </div>
                <button type="submit" className="w-[80px] sm:w-[120px] h-9 bg-violet-900 border border-white shadow-sm rounded-md text-white self-center">Log In</button>
              </form>
            </>
          )}
        </nav>
        <nav className="w-[370px] md:w-[500px] h-[400px] bg-violet-900 log1_radius grid place-content-center overflow-hidden">
          {switchform === 0 ? (
            <>
              {/* login message */}
              <div className="w-full h-[250px]   flex flex-col justify-around items-center">
                <h1 className=" font-bold text-white text-[30px]">Welcome Back !</h1>
                <p className="text-center w-[80%] text-white">To keep connected with us please login with your personal info</p>
                <button type="submit" className="w-[80px] sm:w-[120px] h-9 bg-white border border-violet-900 rounded-md text-violet-900 " onClick={() => setswitchform(1)}>Sign In</button>
              </div>
            </>
          ) : (
            <>
              {/* sign up message */}
              <div className="w-full h-[250px]   flex flex-col justify-around items-center">
                <h1 className=" font-bold text-white text-[30px]">Hello ,Friend !</h1>
                <p className="text-center w-[80%] text-white">Enter your personal details and start journey with us</p>
                <button type="submit" className="w-[80px] sm:w-[120px] h-9 bg-white border border-violet-900 rounded-md text-violet-900" onClick={() => setswitchform(0)}>Sign Up</button>
              </div>
            </>
          )}
        </nav>
      </section>
    </>
  );
};

export default Auth;
