import React, { useState, Fragment } from "react";
import {
  Divider,
  Typography,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
} from "@material-ui/core";
import { Telegram } from "@material-ui/icons";
import "../styles/modulechatroomc.css";
import JinaEPDataService from "../Axios/jinaesiplatform";
import PostCommentC from "./PostCommentC";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/User";
import nopostcomment from "../assets/nopostcomment.svg";

export default function ModuleChatRoomC({ isOpen, toggleDrawer, module_id }) {
  const user = useSelector(selectUser);
  const [roomMessages, setRoomMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  // get msgs of the room chats of the module
  async function retrieveRoomMessages() {
    await JinaEPDataService.getCRoomMsgs(module_id)
      .then((response) => {
        setRoomMessages(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  retrieveRoomMessages();
  // send message in the room chat of the module
  const handleSendRoomMessage = async (e) => {
    e.preventDefault();
    var data = {
      moduleId: module_id,
      message: messageContent,
      sender_email: user.email,
    };
    await JinaEPDataService.sendCRoomMsg(data)
      .then((response) => {
        setMessageContent("");
        setRoomMessages([...roomMessages, response.data]);
      })
      .catch((e) => console.log(e));
  };
  const keyDownToSend = (e) => {
    if (e.key === "Enter") {
      handleSendRoomMessage(e);
      // retrieveRoomMessages();
    }
  };

  return (
    <div>
      <Fragment>
        <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
          <div className="modulechatroomc_list_root">
            <Typography variant="h6" gutterBottom>
              {`${roomMessages.length} Messages`}
            </Typography>
            <Divider />
            <div className="modulechatroomc_list_comments">
              {roomMessages.length === 0 ? (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}>
                  <img
                    src={nopostcomment}
                    alt="no_post_comment"
                    style={{
                      width: 250,
                      objectFit: "containt",
                    }}
                  />
                </div>
              ) : (
                roomMessages &&
                roomMessages.map((message) => (
                  <PostCommentC
                    key={message._id}
                    user_email={user.email}
                    comment={message}
                  />
                ))
              )}
            </div>
            <Input
              style={{
                marginTop: 16,
                width: "100%",
              }}
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Type message.."
              onKeyDown={keyDownToSend}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleSendRoomMessage}>
                    <Telegram />
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
        </Drawer>
      </Fragment>
    </div>
  );
}
