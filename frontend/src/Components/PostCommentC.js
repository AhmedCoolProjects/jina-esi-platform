import React from "react";
import { Paper, Typography, Divider } from "@material-ui/core";
import moment from "moment";

function PostCommentC({ comment, user_email }) {
  return (
    <Paper
      elevation={4}
      className={
        comment.sender_email === user_email
          ? "postcommentdrawerc_sender_paper"
          : "postcommentdrawerc_reciever_paper"
      }>
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
        {comment.content}
      </Typography>
      <Typography
        style={{ textAlign: "right" }}
        variant="subtitle2"
        color="textSecondary">
        {moment(comment.date).fromNow()}
      </Typography>
    </Paper>
  );
}

export default PostCommentC;
