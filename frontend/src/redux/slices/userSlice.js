import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
    suggestedUsers:null,
    profileData:null,
    following:[],
    searchData:null,
    notificationData:null,
  },
  reducers: {
    setUserData: (state, action) => {
      // Only store if payload is a valid object
      if (action.payload && typeof action.payload === "object") {
        // Check if backend returns { user: {...} } or direct user object
        state.userData = action.payload.user || action.payload;
      } else {
        console.error("Invalid user data:", action.payload);
        state.userData = null;
      }
    },
    setSuggestedUsers:(state,action)=>{
      state.suggestedUsers = action.payload
    },

     setNotificationData:(state,action)=>{
      state.notificationData = action.payload
    },

    setProfileData:(state,action)=>{
      state.profileData = action.payload
    },
     setFollowing:(state,action)=>{
      state.following = action.payload
    },
    setSearchData:(state,action)=>{
      state.searchData = action.payload
    },
    toggelFollow:(state,action)=>{
      const targetUserId = action.payload
      if(state.following.includes(targetUserId)){
        state.following=state.following.filter(id=>id!=targetUserId)
      }else{
        state.following.push(targetUserId)
      }
    },

    clearUserData: (state) => {
      state.userData = null;
    }
  }
});

export const { setUserData, clearUserData, setSuggestedUsers, setProfileData,toggelFollow, setFollowing,setSearchData,setNotificationData} = userSlice.actions;
export default userSlice.reducer;
