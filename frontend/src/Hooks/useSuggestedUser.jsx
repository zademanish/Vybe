import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestedUsers } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function useSuggestedUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const suggestedUsers = useSelector(state => state.user.suggestedUsers);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/suggested`, { withCredentials: true })
      .then(res => {
        if (typeof res.data === "string" && res.data.includes("<!DOCTYPE html>")) {
          console.error("Backend returned HTML instead of JSON:", res.data);
          return;
        }
        dispatch(setSuggestedUsers(res.data));
      })
      .catch(err => {
        console.error("Error fetching suggested users:", err);
        navigate("/signin");
      });
  }, [dispatch, navigate]);

  return suggestedUsers;
}
