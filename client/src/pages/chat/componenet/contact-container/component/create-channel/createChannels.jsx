import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Lottie from "react-lottie";
import { animationDefaultOption, getColor } from "@/lib/utils";
import { apiclient } from "@/lib/api-client";
import {
  GET_ALL_CONTACTS_ROUTES,
  HOST,
  SEARCH_CONTACT_ROUTES,
} from "@/utils/constant";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselected";

function CreateChannel() {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [newChannelModal, setNewChannelModal] = useState(false);
  const [searchedContacts, setsearchedContacts] = useState([]);
  const [allContacts, setallContacts] = useState([]);
  const [selectedContact, setselectedContact] = useState([]);
  const [channelName, setchannelName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await apiclient.get(GET_ALL_CONTACTS_ROUTES, {
        withCredentials: true,
      });
      setallContacts(res.data.contacts);
    };
    getData();
  }, []);

  const createChannel = async () => {};

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90  text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setNewChannelModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white ">
            Create New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
        <DialogContent className="bg-[#1c1b1e] border-none text-white w-[400px] h-[400px] flex flex-col ">
          <DialogHeader>
            <DialogTitle>
              Please fill up the details for new channel.
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Channel Name"
              className="rounded-xl p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => setchannelName(e.target.value)}
              value={channelName}
            />
          </div>
          <div>
            <MultipleSelector
              className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white  "
              defaultOptions={allContacts}
              placeholder="Search Contacts"
              value={selectedContact}
              onChange={setselectedContact}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600">
                  {" "}
                  No results found.
                </p>
              }
            />
          </div>
          <div>
            <Button
              className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
              onClick={createChannel}
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateChannel;
