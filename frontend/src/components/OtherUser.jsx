import React from 'react'
import { useSelector } from 'react-redux'
import dp from '../assets/dp.webp';
import { useNavigate } from 'react-router-dom';
import FollowButton from './FollowButton';


const OtherUser = ({user}) => {
    const {userData} = useSelector(state=>state.user)
    const navigate = useNavigate()
  return (
    <div className='w-full h-[80px] flex items-center justify-between border-b-2 border-gray-800 px-[10px]'>
             <div className="flex items-center gap-2">
                   <div className="w-[50px] h-[50px] rounded-full border-2 border-black overflow-hidden cursor-pointer" onClick={()=>navigate(`/profile/${user.userName}`)}>
                     <img
                       src={user?.profileImage || dp}
                       alt="Profile"
                       className="w-full h-full object-cover"
                     />
                   </div>
         
                   <div>
                     <div className="text-white text-[18px] font-semibold">
                       {user?.userName || 'Guest'}
                     </div>
                     <div className="text-gray-400 text-[15px] font-semibold">
                       {user?.name || ''}
                     </div>
                   </div>
                 </div>
                 <FollowButton tailwind={'px-[10px] w-[100px] py-[5px] h-[40px] bg-white rounded-2xl'} targetUserId={user._id}/>
        
    </div>
  )
}

export default OtherUser