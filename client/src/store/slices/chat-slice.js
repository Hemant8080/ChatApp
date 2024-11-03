export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  SelectedChatMessages: [],
  directMassageContacts: [],
  isUploading: false,
  isDownloading: false,
  fileUploadProgress: 0,
  fileDownloadingProgress: 0,
  setIsUploading: (isUploading) => set({ isUploading }),
  setIsDownloading: (isDownloading) => set({ isDownloading }),
  setFileUploadProgress: (fileUploadProgress) => set({ fileUploadProgress }),
  setFileDownloadProgress: (fileDownloadingProgress) => set({ fileDownloadingProgress }),
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessages: (SelectedChatMessages) =>
    set({ SelectedChatMessages }),
  setDirectMassageContacts: (directMassageContacts) =>
    set({ directMassageContacts }),
  closeChat: () =>
    set({
      selectedChatType: undefined,
      selectedChatData: undefined,
      SelectedChatMessages: [],
    }),
  addMessage: (message) => {
    const SelectedChatMessages = get().SelectedChatMessages;
    const selectedChatType = get().selectedChatType;
    set({
      SelectedChatMessages: [
        ...SelectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
});
