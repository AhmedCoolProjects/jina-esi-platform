import React from "react";
import { Paper, Fab } from "@material-ui/core";
import "../styles/docscardc.css";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

function DocsCardC({ pdf_link, pdf_id }) {
  return (
    <Paper className="docscardc_iframe_container">
      <Link
        to={{
          pathname: `/document/${pdf_id}`,
          pdf_link: pdf_link,
        }}
        style={{
          color: "inherit",
          textDecoration: "none",
        }}>
        <Fab
          style={{
            position: "absolute",
            bottom: 10,
            right: 20,
            zIndex: 20,
            backgroundColor: "#000",
          }}>
          <OpenInNewIcon
            style={{
              fontSize: 16,
            }}
            color="primary"
          />
        </Fab>
      </Link>
      <iframe
        src={pdf_link}
        title="pdf_link"
        className="docscardc_iframe"></iframe>
    </Paper>
  );
}

export default DocsCardC;
