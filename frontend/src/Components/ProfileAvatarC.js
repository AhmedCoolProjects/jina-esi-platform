import React from "react";
import { Avatar, Badge } from "@material-ui/core";
import { AddAPhotoOutlined } from "@material-ui/icons";

export default function ProfileAvatarC({ user_image }) {
  return (
    <div style={{ display: "flex" }}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={<AddAPhotoOutlined />}>
        <Avatar
          style={{
            width: 200,
            height: 200,
          }}
          alt="User Image"
          src={user_image}
        />
      </Badge>
    </div>
  );
}
