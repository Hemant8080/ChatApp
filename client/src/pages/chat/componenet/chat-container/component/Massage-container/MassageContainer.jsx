import { apiclient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { GET_ALL_MESSAGES, HOST } from "@/utils/constant";
import moment from "moment";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { MdFolderZip } from "react-icons/md";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
function MassageContainer() {
  const scrollRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    setSelectedChatMessages,
    SelectedChatMessages,
    setFileDownloadProgress,
    setIsDownloading,
  } = useAppStore();
  const [showImage, setshowImage] = useState(false);
  const [imageUrl, setimageUrl] = useState(null);

  const fetchMessages = useCallback(async () => {
    if (!selectedChatData?._id || selectedChatType !== "contact") return;

    try {
      const res = await apiclient.post(
        GET_ALL_MESSAGES,
        { id: selectedChatData._id },
        { withCredentials: true }
      );
      if (res.data.message) {
        setSelectedChatMessages(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [selectedChatData?._id, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [SelectedChatMessages]);

  const checkIfImage = (filePath) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heif)$/i;
    return imageRegex.test(filePath);
  };

  const downloadFile = async (file) => {
    setIsDownloading(true);
    setFileDownloadProgress(0);
    const res = await apiclient.get(`${HOST}/${file}`, {
      responseType: "blob",
      onDownloadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        setFileDownloadProgress(Math.round((loaded * 100) / total));
      },
    });

    const urlBlob = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", file.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
    setIsDownloading(false);
    setFileDownloadProgress(0);
  };

  const renderDMMessage = (message) => (
    <div
      className={`${
        message.sender === selectedChatData._id ? "text-left" : "text-right"
      }`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {message.content}
        </div>
      )}

      {message.messageType === "file" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {checkIfImage(message.fileUrl) ? (
            <div
              className="cursor-pointer"
              onClick={() => {
                setshowImage(true);
                setimageUrl(message.fileUrl);
              }}
            >
              <img
                src={`${HOST}/${message.fileUrl}`}
                alt=""
                height={300}
                width={300}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <span className="text-white/80 text-3xl bg-black/20 rounded-full p-3">
                <MdFolderZip />
              </span>
              <span>{message.fileUrl.split("/").pop()} </span>
              <span
                className="bg-black/20 p-3 text-2xl rounded-full  hover:bg-black/50 cursor-pointer transition-all duration-300"
                onClick={() => downloadFile(message.fileUrl)}
              >
                <IoMdArrowRoundDown />
              </span>
            </div>
          )}
        </div>
      )}

      <div className="text-xs text-gray-600">
        {moment(message.timeStamp).format("LT")}
      </div>
    </div>
  );

  const renderMessage = useCallback(() => {
    let lastDate = null;

    return SelectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timeStamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timeStamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessage(message)}
        </div>
      );
    });
  }, [SelectedChatMessages, selectedChatType]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessage()}
      <div ref={scrollRef} />

      {showImage && (
        <div className="fixed z-[100] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-lg flex-col ">
          <div>
            <img
              src={`${HOST}/${imageUrl}`}
              className="h-[80vh] w-full bg-cover "
              alt=""
            />
          </div>
          <div className="flex gap-5 fixed top-0 mt-5">
            <button
              className="bg-black/20 p-3 text-2xl rounded-full  hover:bg-black/50 cursor-pointer transition-all duration-300"
              onClick={() => downloadFile(imageUrl)}
            >
              <IoMdArrowRoundDown />
            </button>
            <button
              className="bg-black/20 p-3 text-2xl rounded-full  hover:bg-black/50 cursor-pointer transition-all duration-300"
              onClick={() => {
                setshowImage(false);
                setimageUrl(null);
              }}
            >
              <IoCloseSharp />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MassageContainer;
