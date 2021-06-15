import React, { useState } from "react";
import {
  Container,
  Fab,
  Avatar,
  ListItemIcon,
  Menu,
  Paper,
  Typography,
  IconButton,
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

const user_id = 1;
const comments = [
  {
    text: "this is email 2",
    sender_id: 2,
    date: "12 15 1815185",
    sender_email: "jjj",
    id: 5,
  },
  {
    text: "this is email 1",
    sender_id: 1,
    sender_email: "jjj",
    date: "12 15 1815185",
    id: 15,
  },
  {
    text: "this is email 3",
    sender_email: "jjj",
    sender_id: 3,
    date: "12 15 1815185",
    id: 115,
  },
  {
    text: "this is email 2",
    sender_id: 2,
    date: "12 15 1815185",
    sender_email: "jjj",
    id: 6,
  },
  {
    text: "this is email 1",
    sender_id: 1,
    sender_email: "jjj",
    date: "12 15 1815185",
    id: 16,
  },
  {
    text: "this is email 3",
    sender_email: "jjj",
    sender_id: 3,
    date: "12 15 1815185",
    id: 116,
  },
];
const personalChatList = [
  {
    name: "My Profile",
    image: (
      <Avatar
        style={{ width: 50, height: 50 }}
        alt="my_name"
        src="https://www.gettyimages.fr/gi-resources/images/500px/983794168.jpg"
      />
    ),
  },
  {
    name: "My Profile",
    image: (
      <Avatar
        style={{ width: 50, height: 50 }}
        alt="my_name"
        src="https://www.gettyimages.fr/gi-resources/images/500px/983794168.jpg"
      />
    ),
  },
  {
    name: "My Profile",
    image: (
      <Avatar
        style={{ width: 50, height: 50 }}
        alt="my_name"
        src="https://www.gettyimages.fr/gi-resources/images/500px/983794168.jpg"
      />
    ),
  },
  {
    name: "My Profile",
    image: (
      <Avatar
        style={{ width: 50, height: 50 }}
        alt="my_name"
        src="https://www.gettyimages.fr/gi-resources/images/500px/983794168.jpg"
      />
    ),
  },
  {
    name: "My Profile",
    image: (
      <Avatar
        style={{ width: 50, height: 50 }}
        alt="my_name"
        src="https://www.gettyimages.fr/gi-resources/images/500px/983794168.jpg"
      />
    ),
  },
  {
    name: "My Profile",
    image: (
      <Avatar
        style={{ width: 50, height: 50 }}
        alt="my_name"
        src="https://www.gettyimages.fr/gi-resources/images/500px/983794168.jpg"
      />
    ),
  },
];
function PersonalChatP() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const PersonalChatListMenu = (
    <Menu
      id="fade-menu"
      style={{
        maxHeight: 400,
      }}
      anchorEl={mobileMoreAnchorEl}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      TransitionComponent={Fade}>
      {personalChatList.map((item, index) => (
        <MenuItem key={index} onClick={handleMobileMenuClose}>
          <ListItemIcon>{item.image}</ListItemIcon>
          {item.name}
        </MenuItem>
      ))}
    </Menu>
  );
  const [recieverSelected, setRecieverSelected] = useState(null);
  return (
    <Container maxWidth="md">
      <Fab
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleMobileMenuOpen}
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
            color="secondary"
          />
        </Fab>
      </Link>
      {PersonalChatListMenu}
      <div className="pchatp_container">
        <div className="pchatp_header">
          <Typography variant="h6" color="textSecondary">
            {recieverSelected ? "Reciever" : "Select an account ..."}
          </Typography>
        </div>
        <main className="pchatp_main">
          {recieverSelected ? (
            comments.map((comment) => (
              <Paper
                elevation={4}
                className={
                  comment.sender_id === user_id
                    ? "pchatp_sender_paper"
                    : "pchatp_reciever_paper"
                }
                key={comment.id}>
                <Typography
                  style={{
                    padding: 8,
                  }}
                  variant="subtitle1"
                  paragraph>
                  {comment.text}
                </Typography>
                <Typography
                  style={{ textAlign: "right" }}
                  variant="subtitle2"
                  color="textSecondary">
                  {comment.date}
                </Typography>
              </Paper>
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
            className="pchatp_input"
            type="text"
            placeholder="Type message..."
          />
          <IconButton>
            <TelegramIcon />
          </IconButton>
        </div>
      </div>
    </Container>
  );
}

export default PersonalChatP;
