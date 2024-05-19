import React from 'react';
import { useContext } from 'react';
import { VscAccount } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import { authcontext, UserInfo } from '../../context/logcontext';

const Header = () => {
  let {setswitchform} = useContext(authcontext)
  let {islogged} = useContext(UserInfo)
  return(
    <>
      <header className='h-[60px] flex items-center justify-around sh'>
        <div>
          <Link to="" ><h1 className='text-violet-900 text-[16px] sm:text-[30px] font-bold'>HomeLand.</h1></Link>
        </div>
        <nav className='flex items-center gap-5 sm:gap-9'>
          <div className='flex gap-5 sm:gap-10'>
                <Link to="/auth"><button  className='w-[80px] sm:w-[120px] h-9 bg-white border border-violet-900 rounded-md text-violet-900' onClick={()=>setswitchform(1)}>Log In</button></Link>
                <Link to="/auth"><button className='w-[80px] sm:w-[120px] h-9 bg-violet-900 text-white rounded-md' onClick={()=>setswitchform(0)}>Sign Up</button></Link>
          </div>
          {
            islogged ? 
            <Link to="/ClientDash" ><VscAccount size={30}/></Link> 
            : <></>
          }
        </nav>
      </header>
    </>
  )
};

export default Header;
