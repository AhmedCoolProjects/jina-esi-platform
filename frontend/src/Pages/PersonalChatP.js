import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Fab,
  ListItemText,
  Menu,
  Typography,
  IconButton,
  ListItemAvatar,
  Avatar,
  MenuItem,
  Fade,
} from "@material-ui/core";
import {
  GroupOutlined,
  HomeOutlined,
  Telegram as TelegramIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import RecieverNotSelectedImage from "../assets/reciever_not_selected.svg";
import "../styles/pchatp.css";
import { useSelector } from "react-redux";
import JinaEPDataService from "../Axios/jinaesiplatform";
import PMessageC from "../Components/PMessageC";
import { selectUser } from "../Redux/User";
import { storage } from "../firebase/firebase";
import { io } from "socket.io-client";

const ENDPOINT = "https://jinaep-api.herokuapp.com";
let socket;

function PersonalChatP() {
  const user = useSelector(selectUser);
  const [contactsList, setContactsList] = useState(null);
  const [contactsAnchorEL, setContactsAnchorEL] = useState(null);
  const contactsListOpen = Boolean(contactsAnchorEL);
  const [arrivalPMsg, setArrivalPMsg] = useState(null);
  const [myPMsg, setMyPMsg] = useState("");
  const [userSelected, setUserSelected] = useState(null);
  const [cConv, setCConv] = useState(null);
  const scrollRef = useRef();
  const [pChatConversation, setPChatConversation] = useState(null);
  const [selectedUserImage, setSelectedUserImage] = useState(null);
  const handleCloseContactsMenu = (e) => {
    e.preventDefault();
    setContactsAnchorEL(null);
  };
  const handleOpenContactsMenu = (event) => {
    event.preventDefault();
    setContactsAnchorEL(event.currentTarget);
  };
  const setUserSelectedFct = (e, contact) => {
    handleCloseContactsMenu(e);
    setUserSelected(contact);
  };
  const PersonalChatListMenu = (
    <Menu
      id="fade-menu"
      style={{
        maxHeight: 600,
      }}
      anchorEl={contactsAnchorEL}
      keepMounted
      open={contactsListOpen}
      onClose={handleCloseContactsMenu}
      TransitionComponent={Fade}>
      {contactsList &&
        contactsList.map((contact) => (
          <MenuItem
            key={contact._id}
            onClick={(e) => setUserSelectedFct(e, contact)}>
            <ListItemText
              secondary={contact.email}
              primary={`${contact.first_name} ${contact.last_name}`}
            />
          </MenuItem>
        ))}
    </Menu>
  );

  // set socket, and get the arrival new msg
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("getNewPMsg", (data) => {
      setArrivalPMsg({
        senderId: data.senderId,
        message: data.message,
        createdAt: Date.now(),
      });
    });
  }, []);

  // send msg to db and to socket server
  const handleSendMyPMsg = (e) => {
    e.preventDefault();
    const sendingMsg = {
      senderId: user._id,
      message: myPMsg,
      convId: cConv._id,
    };
    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId: userSelected._id,
      message: myPMsg,
    });
    JinaEPDataService.sendPMsg(sendingMsg).then((res) => {
      setPChatConversation([...pChatConversation, res.data]);
    });
    setMyPMsg("");
  };
  const keyDownToSend = (e) => {
    if (e.key === "Enter") {
      handleSendMyPMsg(e);
    }
  };
  // get arrival pmsg
  useEffect(() => {
    arrivalPMsg &&
      cConv?.participantsArr.includes(arrivalPMsg.senderId) &&
      setPChatConversation((prev) => [...prev, arrivalPMsg]);
  }, [arrivalPMsg, cConv]);
  // get all contacts
  useEffect(() => {
    if (contactsList != null) return;
    async function getAllContacts() {
      await JinaEPDataService.getAllContacts()
        .then((res) => {
          setContactsList(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    getAllContacts();
  }, [contactsList]);
  // get the conversation and messages data
  useEffect(() => {
    if (userSelected == null) return;
    let participants;
    if (userSelected._id < user._id) {
      participants = userSelected._id + "+" + user._id;
    } else {
      participants = user._id + "+" + userSelected._id;
    }
    async function getConvAndMsgs() {
      await JinaEPDataService.getConversation(participants).then(
        async (res) => {
          const conv = res.data;
          setCConv(conv);
          await JinaEPDataService.getMessagesOfConv(conv._id).then((resp) => {
            setPChatConversation(resp.data);
          });
        }
      );
    }
    async function getUserImageFromStorage() {
      await storage
        .ref("users-images")
        .child(`${userSelected.email}.png`)
        .getDownloadURL()
        .then((url) => {
          setSelectedUserImage(url);
        });
    }
    getConvAndMsgs();
    getUserImageFromStorage();
  }, [userSelected, user._id]);
  // send userId
  useEffect(() => {
    socket.emit("userId", user._id);
  }, [user]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [pChatConversation]);
  return (
    <Container maxWidth="md">
      <Fab
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleOpenContactsMenu}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 20,
          backgroundColor: "#ffffffb4",
        }}>
        <GroupOutlined
          style={{
            fontSize: 28,
          }}
          color="secondary"
        />
      </Fab>
      <Link
        to="/"
        style={{
          color: "inherit",
          textDecoration: "none",
        }}>
        <Fab
          style={{
            position: "fixed",
            top: 20,
            left: 20,
            zIndex: 20,
            backgroundColor: "#ffffffb4",
          }}>
          <HomeOutlined
            style={{
              fontSize: 28,
            }}
            color="seconda0ry"
          />
        </Fab>
      </Link>
      {PersonalChatListMenu}
      <div className="pchatp_container">
        <div className="pchatp_header">
          <ListItemAvatar>
            <Avatar src={selectedUserImage ? selectedUserImage : ""} />
          </ListItemAvatar>
          <Typography variant="h6" color="textSecondary">
            {userSelected
              ? userSelected.first_name + " " + userSelected.last_name
              : "Select an account ..."}
          </Typography>
        </div>
        <main className="pchatp_main">
          {userSelected ? (
            pChatConversation &&
            pChatConversation.map((message) => (
              <div ref={scrollRef} key={message._id}>
                <PMessageC message={message} userId={user._id} />
              </div>
            ))
          ) : (
            <img
              style={{
                height: "100%",
                objectFit: "contain",
              }}
              src={RecieverNotSelectedImage}
              alt="Reciever_Not_Selected"
            />
          )}
        </main>
        <div className="pchatp_input_container">
          <input
            value={myPMsg}
            onChange={(e) => setMyPMsg(e.target.value)}
            className="pchatp_input"
            type="text"
            placeholder="Type message..."
            disabled={!userSelected}
            onKeyDown={keyDownToSend}
          />
          <IconButton
            onClick={handleSendMyPMsg}
            disabled={!userSelected || !myPMsg}>
            <TelegramIcon />
          </IconButton>
        </div>
      </div>
    </Container>
  );
}

export default PersonalChatP;
