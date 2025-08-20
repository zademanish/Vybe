import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import useCurrentUser from "./Hooks/useCurrentUser";
import useSuggestedUser from "./Hooks/useSuggestedUser";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Upload from "./pages/Upload";
import useGetAllPost from "./Hooks/useGetAllPost";
import Loops from "./pages/Loops";
import useGetAllLoops from "./Hooks/useGetAllLoops";
import Story from "./pages/Story";
import useGetAllStories from "./Hooks/useGetAllStories";
import Messages from "./pages/Messages";
import MessageArea from "./pages/MessageArea";
import { io } from "socket.io-client"
import { setOnlineUsers, setSocket } from "./redux/slices/socketSlice";
import useGetFollowingList from "./Hooks/useGetFollowingList";
import useGetPrevChats from "./Hooks/useGetPrevChats";
import Search from "./pages/Search";
import useGetAllNotification from "./Hooks/useGetAllNotification";
import Notification from "./pages/Notification";
import { setNotificationData } from "./redux/slices/userSlice";

const App = () => {
  useCurrentUser();
  useSuggestedUser();
  useGetAllPost();
  useGetAllLoops();
  useGetAllStories();
  useGetFollowingList();
  useGetPrevChats();
  useGetAllNotification()
  
  
  const { userData,notificationData } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch()

  useEffect(()=>{
    if(userData){
      const socketIo = io(import.meta.env.VITE_SERVER_URL,{
        query:{
          userId:userData._id
        }
      })
      dispatch(setSocket(socketIo))

      socketIo.on("getOnlineUsers",(users)=>{
        dispatch(setOnlineUsers(users))
      })

      return ()=>socketIo.close()
    }else{
      if(socket){
        socket.close()
        dispatch(setSocket(null))
      }
    }

  },[userData])

    socket?.on("newNotification",(noti)=>{
      dispatch(setNotificationData([...notificationData,noti]))
    })



  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/signin" />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to="/" />}
      />
      <Route
        path="/profile/:userName"
        element={userData ? <Profile /> : <Navigate to="/signin" />}
      />
       <Route
        path="/story/:userName"
        element={userData ?  <Story/> : <Navigate to="/signin" />}
      />
      <Route
        path="/upload"
        element={userData ? <Upload /> : <Navigate to="/signin" />}
      />
      <Route
        path="/editprofile"
        element={userData ? <EditProfile /> : <Navigate to="/signin" />}
      />
       <Route
        path="/messages"
        element={userData ? <Messages /> : <Navigate to="/signin" />}
      />
       <Route
        path="/messageArea"
        element={userData ? <MessageArea /> : <Navigate to="/signin" />}
      />
        <Route
        path="/loops"
        element={userData ? <Loops/> : <Navigate to="/signin" />}
      />

         <Route
        path="/search"
        element={userData ? <Search/> : <Navigate to="/signin" />}
      />
        <Route
        path="/notifications"
        element={userData ? <Notification/> : <Navigate to="/signin" />}
      />
    </Routes>
  );
};

export default App;
