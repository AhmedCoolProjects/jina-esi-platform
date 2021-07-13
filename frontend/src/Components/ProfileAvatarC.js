import React, { useRef } from "react";
import { Avatar, Badge, IconButton } from "@material-ui/core";
import { AddAPhotoOutlined } from "@material-ui/icons";
import { storage } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../Redux/User";

export default function ProfileAvatarC() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const hiddenFileInput = useRef(null);

  const handleChangeUserImage = (e) => {
    hiddenFileInput.current.click();
  };
  const getNewUserImage = (e) => {
    storeNewUserImageToStorage(e.target.files[0]);
  };
  const storeNewUserImageToStorage = (newUserImageL) => {
    const newImageName = user.email + ".png";

    const uploadTask = storage
      .ref(`users-images/${newImageName}`)
      .put(newUserImageL);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress logic
        // const progress = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
        // setProgress(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("users-images")
          .child(`${newImageName}`)
          .getDownloadURL()
          .then((url) => {
            const newUser = {
              first_name: user.first_name,
              last_name: user.last_name,
              image: url,
              email: user.email,
            };
            dispatch(login(newUser));
          });
      }
    );
  };
  return (
    <div style={{ display: "flex" }}>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={getNewUserImage}
        style={{ display: "none" }}
      />
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          <IconButton onClick={handleChangeUserImage}>
            <AddAPhotoOutlined />
          </IconButton>
        }>
        <Avatar
          style={{
            width: 200,
            height: 200,
          }}
          alt="User Image"
          src={user.image}
        />
      </Badge>
    </div>
  );
}
