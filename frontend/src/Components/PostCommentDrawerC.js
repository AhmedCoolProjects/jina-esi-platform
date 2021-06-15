import React, { useState, Fragment } from "react";
import {
  Divider,
  Typography,
  Drawer,
  IconButton,
  Input,
  Paper,
  InputAdornment,
} from "@material-ui/core";
import { Telegram } from "@material-ui/icons";
import "../styles/postcommentdrawerc.css";

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

export default function PostCommentDrawerC({ isOpen, toggleDrawer }) {
  const list = (
    <div className="postcommentdrawerc_list_root">
      <Typography variant="h6" gutterBottom>
        16 Comments
      </Typography>
      <Divider />
      <div className="postcommentdrawerc_list_comments">
        {comments.map((comment) => (
          <Paper
            elevation={4}
            className={
              comment.sender_id === user_id
                ? "postcommentdrawerc_sender_paper"
                : "postcommentdrawerc_reciever_paper"
            }
            key={comment.id}>
            <Typography variant="strong" color="textSecondary">
              {comment.sender_email}
            </Typography>
            <Divider />
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
        ))}
      </div>
      <Input
        style={{
          marginTop: 16,
          width: "100%",
        }}
        placeholder="Add Comment.."
        endAdornment={
          <InputAdornment position="end">
            <IconButton>
              <Telegram />
            </IconButton>
          </InputAdornment>
        }
      />
    </div>
  );

  return (
    <div>
      <Fragment>
        <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
          {list}
        </Drawer>
      </Fragment>
    </div>
  );
}
