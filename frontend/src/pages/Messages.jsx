import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import OnlineUser from '../components/OnlineUser'
import dp from '../assets/dp.webp';

const Messages = () => {
    const navigate = useNavigate()
    const {userData} = useSelector(state=>state.user)
      const {onlineUsers} = useSelector(state=>state.socket)
        const {prevChatUsers,selectedUsers} = useSelector(state=>state.message)
        const dispatch = useDispatch()
  return (
    <div className='w-full min-h-[100vh] flex flex-col bg-black gap-[20px] p-[20px]'>
         <div className="w-full h-[80px]  flex items-center gap-[20px] px-[10px] ">

                <MdOutlineKeyboardBackspace
                  onClick={() => navigate(`/`)}
                  className="text-white w-[25px] h-[25px] lg:hidden cursor-pointer"
                />
                <h1 className="text-white text-[20px] font-semibold">Message</h1>
              </div>
              <div className='w-full h-[80px] flex gap-[20px] justify-start items-center overflow-x-auto p-[20px] border-b-2 border-gray-800'>
                  {userData?.following.map((user,index)=>(
                        (onlineUsers?.includes(user._id)) && <OnlineUser user={user}/>
                  ))}
              </div>
{/* prev user */}
              <div className='w-full h-full overflow-auto flex flex-col gap-[20px]'>
                    {prevChatUsers.map((user,index)=>(
                      <div className='text-white cursor-pointer w-full flex items-center gap-[10px] ' onClick={()=>{
                        dispatch(selectedUsers(user))
                         navigate("/messageArea")
                      }
                     }>
                      {onlineUsers?.includes(user._id)? <OnlineUser user={user}/>:   <div className="w-[50px] h-[50px] rounded-full border-2 border-black overflow-hidden cursor-pointer" >
                                           <img
                                             src={user?.profileImage || dp}
                                             alt="Profile"
                                             className="w-full h-full object-cover"
                                           />
                                         </div>}
                        <div className='flex flex-col'>
                      <div className='text-white text-[18px] font-semibold'>{user.userName}</div>
                      {onlineUsers?.includes(user._id) && <div className='text-green-400 text-[15px]'>
                          Active now
                      </div>}
                    </div>
                      </div>
                    ))}
                  
              </div>
    </div>
  )
}

export default Messages