import React from 'react'
import logo from '../assets/logo2.png';
import { FaRegHeart } from 'react-icons/fa6';
import StoryDp from './StoryDp';
import Nav from './Nav';
import { useSelector } from 'react-redux';
import Post from './Post';
import { BiMessageAltDetail } from "react-icons/bi"
import { useNavigate } from 'react-router-dom';


const Feed = () => {
  const {postData} = useSelector(state=>state.post)
  const {userData} = useSelector(state=>state.user)
   const {notificationData} = useSelector(state=>state.user)
  const navigate = useNavigate()
 const {storyList,currentUserStory} = useSelector(state=>state.story)

  return (
    <div className='lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto'>
         <div className=" w-full flex items-center justify-between p-[20px] h-[100px] lg:hidden">
                <img src={logo} alt="Logo" className="w-[80px]" />
                <div className='flex items-center gap-[10px]'>
                  <div className='relative' onClick={()=>navigate("/notifications")}>
                       <FaRegHeart className="text-white w-[25px] h-[25px]" />
                         {notificationData && notificationData.some((noti)=>noti.isRead === false) &&   <div className='w-[10px] h-[10px] bg-red-600 rounded-full absolute top-0 right-[-5px]'>
                       </div> }
                     
                       </div>
                <BiMessageAltDetail onClick={()=>navigate("/messages")} className="text-white w-[25px] h-[25px]"/>
                </div>
              </div>
         <div className='flex w-full overflow-auto gap-[10px] items-center p-[20px]'>
                <StoryDp userName={"Your Story"} ProfileImage={userData.profileImage} story={currentUserStory}/>
                {storyList?.map((story,index)=>(
                      <StoryDp userName={story.author.userName} ProfileImage={story.author.profileImage} story={story} key={index}/>
                ))}
          </div>     

          <div className='w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[10px] relative pb-[120px]'>
    <Nav/>
    {
      postData?.map((post,index)=>(
        <Post post={post} key={index} />
      ))
    }
          </div>

    </div>
  )
}

export default Feed