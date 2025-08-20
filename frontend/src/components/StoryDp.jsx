import React, { useEffect, useState } from 'react'
import dp from '../assets/dp.webp';
import { FiPlusCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';


const StoryDp = ({ProfileImage,userName,story}) => {

  const navigate = useNavigate()
  const {userData} = useSelector(state=>state.user);
  const {storyData,storyList} = useSelector(state=>state.story);

  const [viewed, setViewed] = useState(false)
  const handleViewers = async()=>{
    try {
      const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/story/view/${story?._id}`,{withCredentials:true})

    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(()=>{
   if( story?.viewers?.some((viewer)=>
    viewer?._id?.toString() === userData?._id?.toString() || viewer?.toString() == userData?._id?.toString()
    )){
      setViewed(true)
    }else{
      setViewed(false)
    }
    
  },[story,userData,storyData,storyList])

  const handleClick = ()=>{
    if(!story && userName=="Your Story"){
      navigate("/upload")
    }else if(story && userName=="Your Story"){
      handleViewers()
      navigate(`/story/${userData.userName}`)
    }else{
      handleViewers()
        navigate(`/story/${userName}`)
    }
  }
  return (
    <div className='flex flex-col w-[80px]' >
      <div className={`w-[80px] h-[80px] ${!story ? null : !viewed? "bg-gradient-to-b from-blue-500 to-blue-950" :"bg-gradient-to-r from-gray-500 to-black-800"}  rounded-full flex justify-center items-center relative`} onClick={handleClick} >
          <div className="w-[70px] h-[70px] rounded-full border-2 border-black overflow-hidden cursor-pointer" >
                    <img
                      src={ProfileImage || dp}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    {!story && userName == "Your Story" &&  <div>
                    <FiPlusCircle className='text-black rounded-full  bg-white absolute bottom-[8px] right-[10px] w-[22px] h-[22px]'/>
                    </div>}
                  </div>
      </div>
<div className='text-[14px] text-center truncate w-full text-white'>
  {userName}
</div>
    </div>
  )
}

export default StoryDp