import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setProfileData, setUserData } from "../redux/slices/userSlice";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import dp from "../assets/dp.webp";
import Nav from "../components/Nav";
import FollowButton from "../components/FollowButton";
import Post from "../components/Post";
import { setSelectedUser } from "../redux/slices/messageSlice";

const Profile = () => {
  const { userName } = useParams();
  const navigate = useNavigate();
  const [postType, setPostType] = useState("posts")
  const dispatch = useDispatch();
  const { profileData, userData } = useSelector((state) => state.user);
 const {postData} = useSelector((state) => state.post);
  const handleProfile = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/user/getProfile/${userName}`,
        { withCredentials: true }
      );
      dispatch(setProfileData(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      await axios.get(`${import.meta.VITE_SERVER_URL}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, [userName, dispatch]);

  return (
    <div className="w-full min-h-screen bg-black">
      <div className="w-full h-[80px] flex justify-between items-center px-[30px] text-white">
        <div onClick={() => navigate("/")}>
          <MdOutlineKeyboardBackspace className="text-white w-[25px] h-[25px] cursor-pointer" />
        </div>
        <div className="font-semibold text-[20px]">{profileData?.userName}</div>
        <div
          className="font-semibold cursor-pointer text-[20px] text-blue-500"
          onClick={handleLogOut}
        >
          Log out
        </div>
      </div>

      <div className="w-full h-[150px] px-[10px] flex items-start gap-[20px] lg:gap-[50px] pt-[10px] justify-center">
        <div className="w-[80px] h-[80px] md:w-[140px] md:h-[140px] rounded-full border-2 border-black overflow-hidden cursor-pointer">
          <img
            src={profileData?.profileImage || dp}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-[22px] text-white">
            {profileData?.name}
          </div>
          <div className="text-[17px] text-[#ffffffe8]">
            {profileData?.profession || "New User"}
          </div>
          <div className="text-[17px] text-[#ffffffe8]">{profileData?.bio}</div>
        </div>
      </div>

      <div className="w-full h-[100px] flex items-center justify-center gap-[40px] md:gap-[60px] px-[20%] pt-[30px] text-white">
        <div>
          <div className="text-white text-[22px] md:text-[30px] font-semibold">
            {profileData?.posts?.length}
          </div>
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Posts
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center gap-[20px]">
            <div className="flex relative">
              {profileData?.followers?.slice(0,3).map((user, index) => (
                <div className={`w-[40px] h-[40px] rounded-full border-2 border-black overflow-hidden cursor-pointer ${index > 0 ? `absolute left-[${index*10}px]`:""}`}>
                  <img
                    src={user?.profileImage || dp}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="text-white text-[22px] md:text-[30px] font-semibold">
              {profileData?.followers?.length}
            </div>
          </div>
          <div className="text-white text-[22px] md:text-[30px] font-semibold">
            Followers
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center gap-[20px]">
            <div className="flex relative">
             {profileData?.following?.slice(0,3).map((user,index) => (
                <div className={`w-[40px] h-[40px] rounded-full border-2 border-black overflow-hidden cursor-pointer ${index > 0 ? `absolute left-[${index*10}px]`:""}`}>
                  <img
                    src={user?.profileImage || dp}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-white text-[22px] md:text-[30px] font-semibold">
              {profileData?.following?.length}
            </div>
          </div>
          <div className="text-white text-[22px] md:text-[30px] font-semibold">
            Following
          </div>
        </div>
      </div>

      <div className="w-full h-[80px] flex items-center justify-center gap-[20px] mt-[10px]">
        {profileData?._id == userData?._id && (
          <button
            className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl "
            onClick={() => navigate("/editprofile")}
          >
            Edit Profile
          </button>
        )}

        {profileData?._id != userData?._id && (
          <>
            <FollowButton onFollowChange={handleProfile}
              tailwind={
                "px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl "
              }
              targetUserId={profileData?._id}
            />

            <button  onClick={() => {dispatch(setSelectedUser(profileData))
              navigate("/messageArea")
            }}  className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl ">
              Message{" "}
            </button>
          </>
        )}
      </div>

      <div className="w-full min-h-[100vh] flex justify-center">
        <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px] pb-[100px]">
 {profileData?._id == userData._id && 
      <div className="w-[90%] max-w-[500px] h-[80px] bg-white rounded-full flex justify-center items-center gap-[10px]">
        <div
          className={`${
            postType == "posts"
              ? "bg-black shadow-2xl shadow-black text-white"
              : ""
          } w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setPostType("posts")}
        >
          Post
        </div>

        <div
          className={`${
            postType == "saved"
              ? "bg-black shadow-2xl shadow-black text-white"
              : ""
          } w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setPostType("saved")}
        >
          Saved
        </div>

       
      </div>
 }
          <Nav />
          {profileData?._id == userData._id && 
          <>
        {  postType =="posts" &&
        postData.map((post,index)=>(
          post.author?._id == profileData?._id && <Post post={post} key={index}/>
        )) } 

         {   postType =="saved" &&
        postData.map((post,index)=>(
         userData.saved.includes(post._id) && <Post post={post} key={index}/>
        ))}
          </>   
          }
            {profileData?._id != userData._id && 
        postData.map((post,index)=>(
          post.author?._id == profileData?._id && <Post post={post} key={index}/>
        )) 
          }


        </div>
      </div>
    </div>
  );
};

export default Profile;
