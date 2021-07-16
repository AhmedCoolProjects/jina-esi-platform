import React from "react";
// core
import {
  Grid,
  Paper,
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableContainer,
  TableBody,
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function CnpResultPaperC({
  sData,
  sNotes,
  modulesNotes,
  mark,
  suggestions,
  semester,
}) {
  return (
    <Grid style={{ marginTop: 16 }} container spacing={3}>
      <Grid item xs={12} sm={12} md={4}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>M</StyledTableCell>
                <StyledTableCell>E.M</StyledTableCell>
                <StyledTableCell>N.F E.M</StyledTableCell>
                <StyledTableCell>N.F M</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {sData &&
                sData.module_ids.map((module_, module_index) => (
                  <StyledTableRow key={module_index}>
                    <StyledTableCell>{module_}</StyledTableCell>
                    <StyledTableCell>
                      {sData.el_module_ids[module_index].map(
                        (el_module_, el_module_index) => (
                          <TableRow key={el_module_index}>
                            <TableCell>{el_module_}</TableCell>
                          </TableRow>
                        )
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {sNotes[module_index].map(
                        (el_module_note, index_note) => (
                          <TableRow key={index_note}>
                            <TableCell>{el_module_note}</TableCell>
                          </TableRow>
                        )
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {parseFloat(modulesNotes[module_index]).toFixed(2)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <Paper
          style={{
            flexDirection: "row",
            display: "flex",
            padding: 8,
            alignItems: "center",
            paddingRight: 32,
            justifyContent: "space-between",
          }}>
          <h2>{`Note finale de S${semester}:`}</h2>
          <h1>{parseFloat(mark).toFixed(2)}</h1>
        </Paper>
        <Paper
          style={{
            padding: 16,
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            marginTop: 16,
          }}>
          {suggestions.general_status}
        </Paper>
        {suggestions.status_list.map((sugg, index) => (
          <Paper
            key={index}
            style={{
              padding: 16,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: 16,
              border: "3px solid " + sugg.id_,
            }}>
            <h3 style={{ marginBottom: 8 }}>{sugg.title}</h3>
            <h4>{sugg.message}</h4>
          </Paper>
        ))}
      </Grid>
    </Grid>
  );
}

export default CnpResultPaperC;
