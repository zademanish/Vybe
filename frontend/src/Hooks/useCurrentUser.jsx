import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFollowing, setUserData } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { setCurrentUserStory } from "../redux/slices/storySlice";



export default function useCurrentUser() {
  const dispatch = useDispatch();
  const {storyData} = useSelector(state=>state.story)
const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${import.meta.VITE_SERVER_URL}/api/user/current`, { withCredentials: true })
      .then(res => {
        // Prevent storing HTML payloads
        if (typeof res.data === "string" && res.data.includes("<!DOCTYPE html>")) {
          console.error("Backend returned HTML instead of JSON:", res.data);
          return;
        }
        dispatch(setUserData(res.data));
        dispatch(setCurrentUserStory(res.data.story))

      })
      .catch(err => {
        console.error("Error fetching current user:", err);
        navigate("/signin")
      });
  }, [dispatch,storyData]);
}
