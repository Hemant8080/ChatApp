import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactContainer from "./componenet/contact-container/ContactContainer";
import EmtyChatContainer from "./componenet/empty-chat-container/EmtyChatContainer";
import Chatcontainer from "./componenet/chat-container/Chatcontainer";

function Chat() {
  const {
    userInfo,
    selectedChatType,
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadingProgress,
  } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <div className="flex h-[100vh] text-white overflow-hidden  ">
      {isUploading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg ">
          <h5 className="text-5xl animate-pulse"> Uploading File </h5>
          { fileUploadProgress}%
        </div>
      )}
      {isDownloading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg ">
          <h5 className="text-5xl animate-pulse"> Downloading File </h5>
          { fileDownloadingProgress}%
        </div>
      )}
      <ContactContainer />
      {selectedChatType === undefined ? (
        <EmtyChatContainer />
      ) : (
        <Chatcontainer />
      )}
    </div>
  );
}

export default Chat;
