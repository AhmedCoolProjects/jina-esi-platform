import React from "react";
import { useLocation } from "react-router-dom";

function DocPdfP() {
  const { pdf_link } = useLocation();
  return (
    <div style={{ height: "100vh" }}>
      <iframe
        style={{ width: "100%", height: "100%", margin: 0 }}
        title="titile"
        src={pdf_link}></iframe>
    </div>
  );
}

export default DocPdfP;
