import React, { useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";

function DropzoneAreaC() {
  const [files, setFiles] = useState(null);
  const handleChange = (files) => {
    setFiles(files);
  };
  return <DropzoneArea onChange={() => handleChange.bind(this)} />;
}

export default DropzoneAreaC;
