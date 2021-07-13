import React, { useState } from "react";
import { Container, Grid } from "@material-ui/core";
import TopNavbarC from "../Components/TopNavbarC";
import DocsCardC from "../Components/DocsCardC";
import JinaEPDataService from "../Axios/jinaesiplatform";
import { useParams } from "react-router-dom";

function DocsP() {
  const { module_id } = useParams();
  const [filesSet, setFilesSet] = useState([]);
  async function getPdfFilesOfModule() {
    await JinaEPDataService.getCoursesByModule(module_id).then((res) => {
      setFilesSet(res.data);
    });
  }
  getPdfFilesOfModule();
  return (
    <Container maxWidth="lg">
      <TopNavbarC />
      <main>
        <Grid container spacing={5} style={{ marginTop: 24 }}>
          {filesSet &&
            filesSet.map((objet) => (
              <Grid key={objet._id} item xs={12} sm={6} md={3}>
                <DocsCardC pdf_id={objet._id} pdf_link={objet.link} />
              </Grid>
            ))}
        </Grid>
      </main>
    </Container>
  );
}

export default DocsP;
