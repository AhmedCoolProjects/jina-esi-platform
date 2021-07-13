import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Divider,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import moment from "moment";
import JinaESIPlatform from "../Axios/jinaesiplatform";
import { storage } from "../firebase/firebase";

function PostCommentC({ comment, user_email }) {
  const [senderFullNameImage, setSenderFullNameImage] = useState("");
  //  get info of comment sender
  useEffect(() => {
    async function getCommentSenderInfos() {
      await JinaESIPlatform.getUserByEmail(comment.sender_email).then((res) => {
        storage
          .ref("users-images")
          .child(`${comment.sender_email}.png`)
          .getDownloadURL()
          .then((url) => {
            setSenderFullNameImage({
              fullName: res.data[0].first_name + " " + res.data[0].last_name,
              image: url,
            });
          });
      });
    }
    getCommentSenderInfos();
  }, [comment]);

  return (
    <Paper
      elevation={4}
      className={
        comment.sender_email === user_email
          ? "postcommentdrawerc_sender_paper"
          : "postcommentdrawerc_reciever_paper"
      }>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={senderFullNameImage && senderFullNameImage?.image} />
        </ListItemAvatar>
        <ListItemText
          secondary={comment.sender_email}
          primary={senderFullNameImage && senderFullNameImage?.fullName}
        />
      </ListItem>
      <Divider />
      <Typography
        style={{
          padding: 8,
        }}
        variant="subtitle1"
        paragraph>
        {comment.message}
      </Typography>
      <Typography
        style={{ textAlign: "right" }}
        variant="subtitle2"
        color="textSecondary">
        {moment(comment.createdAt).fromNow()}
      </Typography>
    </Paper>
  );
}

export default PostCommentC;
