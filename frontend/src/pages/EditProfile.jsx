import React, { useRef, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dp from "../assets/dp.webp";
import axios from "axios"
import {setUserData, setProfileData} from "../redux/slices/userSlice"
import {ClipLoader} from "react-spinners"

const EditProfile = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const imageInput = useRef();
  const [frontendImage, setFrontendImage] = useState(
    userData.profileImage || dp
  );

  const [backendImage, setBackendImage] = useState(null);
  const [name, setName] = useState(userData.name || "");
  const [userName, setUserName] = useState(userData.userName || "");
  const [bio, setBio] = useState(userData.bio || "");
  const [profession, setProfession] = useState(userData.profession || "");
  const [gender, setGender] = useState(userData.gender || "");
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)


  const handleImage = (e) => {
    const file = e.target.files?.[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleEditProfile = async ()=>{
    setLoading(true)
    try {
      const formdata = new FormData()
      formdata.append("name",name)
       formdata.append("userName",userName)
        formdata.append("bio",bio)
         formdata.append("profession",profession)
          formdata.append("gender",gender)
          if(backendImage){
            console.log(backendImage)
            formdata.append("profileImage", backendImage)
          }
          const result =await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/editProfile`,formdata,  {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  })
          dispatch(setProfileData(result.data))
          dispatch(setUserData(result.data))
          setLoading(false)
          navigate(`/profile/${userData.userName}`)
    } catch (error) {
      console.log(error);
      setLoading(false)
      
    }
  }

  return (
    <div className="w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px] ">
      <div className="w-full h-[80px]  flex items-center gap-[20px] px-[20px] ">
        <MdOutlineKeyboardBackspace
          onClick={() => navigate(`/profile/${userData.userName}`)}
          className="text-white w-[25px] h-[25px] cursor-pointer"
        />
        <h1 className="text-white text-[20px] font-semibold">Edit Profile</h1>
      </div>
      <div
        className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full border-2 border-black overflow-hidden cursor-pointer "
        onClick={() => imageInput.current.click()}
      >
        <input
          type="file"
          accept="image/*"
          ref={imageInput}
          hidden
          onChange={handleImage}
        />
        <img
          src={frontendImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="text-blue-500 cursor-pointer text-center text-[18px] font-semibold"
        onClick={() => imageInput.current.click()}
      >
        Change Your Profile Picture
      </div>

      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none"
        placeholder="Enter Your Name" value={name} onChange={(e)=>setName(e.target.value)}
      />

      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none"
        placeholder="Enter Your username" value={userName} onChange={(e)=>setUserName(e.target.value)}
      />

      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none"
        placeholder="Bio" value={bio} onChange={(e)=>setBio(e.target.value)}
      />

      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none"
        placeholder="Profession" value={profession} onChange={(e)=>setProfession(e.target.value)}
      />

      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none"
        placeholder="Gender" value={gender} onChange={(e)=>setGender(e.target.value)}
      />

      <button onClick={handleEditProfile} className="px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-white cursor-pointer rounded-2xl font-semibold">
        {loading ? <ClipLoader size={30} color="black"/> : "Save Profile"}
      </button>
    </div>
  );
};

export default EditProfile;
