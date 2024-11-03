import { useState } from "react";
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
import { HOST, SEARCH_CONTACT_ROUTES } from "@/utils/constant";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useAppStore } from "@/store";

function NewDm() {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [openNewContentModal, setopenNewContentModal] = useState(false);
  const [searchedContacts, setsearchedContacts] = useState([]);

  const SearchContact = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const res = await apiclient.post(
          SEARCH_CONTACT_ROUTES,
          { searchTerm },
          { withCredentials: true }
        );
        console.log(res.data.contacts);
        if (res.status === 200 && res.data.contacts) {
          setsearchedContacts(res.data.contacts);
        }
      } else {
        setsearchedContacts([]);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const selectNewContact = (contact) => {
    setopenNewContentModal(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setsearchedContacts([]);
  };
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90  text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setopenNewContentModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white ">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContentModal} onOpenChange={setopenNewContentModal}>
        <DialogContent className="bg-[#1c1b1e] border-none text-white w-[400px] h-[400px] flex flex-col ">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search contacts"
              className="rounded-xl p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => SearchContact(e.target.value)}
            />
          </div>
          {searchedContacts.length > 0 && (
            <ScrollArea className="h-[250px]">
              <div className="flex flex-col gap-5 ">
                {searchedContacts.map((contact) => {
                  return (
                    <div
                      key={contact._id}
                      className="flex gap-5 items-center cursor-pointer"
                      onClick={() => selectNewContact(contact)}
                    >
                      <div className="w-12 h-12 relative">
                        <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                          {contact.image ? (
                            <AvatarImage
                              src={`${HOST}/${contact.image}`}
                              alt="profile"
                              className="object-cover w-full h-full rounded-full bg-black"
                            />
                          ) : (
                            <div
                              className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                                contact.color
                              )}`}
                            >
                              {contact.firstName
                                ? contact.firstName.charAt(0)
                                : contact.email.charAt(0)}
                            </div>
                          )}
                        </Avatar>
                      </div>
                      <div className="flex flex-col">
                        <span>
                          {contact.firstName && contact.lastName
                            ? `${contact.firstName} ${contact.lastName}`
                            : `${contact.email}`}
                        </span>
                        <span>{contact.email}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
          {searchedContacts.length <= 0 && (
            <div className="flex-1 lg:mt-0 md:flex flex-col mt-5  items-center justify-center duration-1000 transition-all   ">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOption}
              />
              <div className="text-opacity-80 text-white flex  flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center ">
                <h3 className="poppins-medium">
                  Hi<span className="text-purple-500">!</span> Search new
                  <span className="text-purple-500"> Contact. </span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewDm;
