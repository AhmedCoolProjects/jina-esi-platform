import React from "react";
import { DropzoneArea } from "material-ui-dropzone";

function DropzoneAreaC({ setFilesFct }) {
  return (
    <DropzoneArea
      acceptedFiles={["image/*"]}
      dropzoneText="Drag or drop your post image her or click"
      onChange={setFilesFct.bind(this)}
    />
  );
}

export default DropzoneAreaC;
