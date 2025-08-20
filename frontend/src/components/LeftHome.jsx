import React, { useState } from 'react';
import logo from '../assets/logo2.png';
import { FaRegHeart } from 'react-icons/fa6';
import dp from '../assets/dp.webp';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserData } from '../redux/slices/userSlice';
import OtherUser from './OtherUser';
import { useNavigate } from 'react-router-dom';
import Notification from '../pages/Notification';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const LeftHome = () => {
  const { userData,suggestedUsers } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [showNotification,setShowNotification] = useState(false)
  const navigate = useNavigate();
  const {notificationData} = useSelector(state=>state.user)

  const handleLogOut = async () => {
    try {
      await axios.get(`${import.meta.VITE_SERVER_URL}/api/auth/signout`, { withCredentials: true });
      dispatch(setUserData(null));
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className={`hidden lg:block w-[25%] h-[100vh] bg-black border-r-2 border-gray-900 ${showNotification? "overflow-hidden": "overflow-auto"}`}>
      {/* Logo & Icon */}
      <div className=" w-full flex items-center justify-between p-[20px] h-[100px]">
        <img src={logo} alt="Logo" className="w-[80px]" />
        <div className='relative' onClick={()=>setShowNotification(prev=>!prev)}>
        <FaRegHeart className="text-white w-[25px] h-[25px]" />
          {notificationData && notificationData.some((noti)=>noti.isRead === false) &&   <div className='w-[10px] h-[10px] bg-red-600 rounded-full absolute top-0 right-[-5px]'>
        </div> }
      
        </div>
      </div>

      {!showNotification && <>
            {/* User Info */}
      <div className="flex items-center justify-between px-[10px] gap-[10px] border-b-2 border-b-gray-900 py-[10px]">
        <div className="flex items-center gap-[10px]">
          <div className="w-[70px] h-[70px] rounded-full border-2 border-black overflow-hidden cursor-pointer">
            <img
              src={userData?.profileImage || dp}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="text-white text-[18px] font-semibold">
              {userData?.userName || 'Guest'}
            </div>
            <div className="text-gray-400 text-[15px] font-semibold">
              {userData?.name || ''}
            </div>
          </div>
        </div>

       

        <button
          onClick={handleLogOut}
          className="text-blue-500 font-semibold cursor-pointer hover:underline"
        >
          Log Out
        </button>
      </div>


       <div className='w-full flex flex-col gap-[20px] p-[20px]'>
          <h1 className='text-white text-[19px]'>Suggested Users</h1>
        </div>
        {suggestedUsers && suggestedUsers.slice(0,3).map((user,index)=>(
            <OtherUser key={index} user={user}/>
          ))}
      </>}

      {showNotification && <Notification/>}

    
    </div>
  );
};

export default LeftHome;
