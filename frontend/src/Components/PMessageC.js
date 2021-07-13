import React from "react";
import { Paper, Typography } from "@material-ui/core";
import moment from "moment";

function PMessageC({ message, userId }) {
  return (
    <Paper
      elevation={4}
      className={
        message.senderId === userId
          ? "pchatp_sender_paper"
          : "pchatp_reciever_paper"
      }>
      <Typography
        style={{
          padding: 8,
        }}
        variant="subtitle1"
        paragraph>
        {message.message}
      </Typography>
      <Typography
        style={{ textAlign: "right" }}
        variant="subtitle2"
        color="textSecondary">
        {moment(message.createdAt).fromNow()}
      </Typography>
    </Paper>
  );
}

export default PMessageC;
