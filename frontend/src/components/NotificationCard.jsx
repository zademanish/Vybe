import React from "react";
import dp from "../assets/dp.webp";

const NotificationCard = ({ noti }) => {

  return (
    <div className="w-full h-[50px] flex justify-between items-center min-h-[50px] p-[5px] bg-gray-800">
      <div className="flex gap-[10px] items-center">
        <div className="w-[40px] h-[40px] rounded-full border-2 border-black overflow-hidden cursor-pointer">
          <img
            src={noti?.sender?.profileImage || dp}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-[16px] text-white font-semibold">
            {noti.sender.userName}
          </h1>
          <div className="text-[15px] text-gray-200">{noti.message}</div>
        </div>
      </div>
      <div className="w-[40px] h-[40px]  overflow-hidden border-2 rounded-full place-items-center border-black">

        {noti.loop ? 
          <video src={noti?.loop?.media} loop autoPlay muted className="h-full object-cover" />
         : noti?.post?.mediaType == "image" ? (
          <img src={noti.post?.media} className="h-full object-cover" />
        ) : noti.post ? 
          <video
            src={noti?.post?.media}
            muted
            loop
            className="h-full object-cover"
          />
         : null}

      </div>
    </div>
  );
};

export default NotificationCard;
