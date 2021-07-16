import React, { useState, useEffect } from "react";
// core
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Input,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
// icons
import { Telegram as TelegramIcon } from "@material-ui/icons";
// components
import TopNavbarC from "../Components/TopNavbarC";
// styles
import "../styles/calcnotesp.css";
import { withStyles } from "@material-ui/core/styles";
// api
import JinaepFlaskAPI from "../Axios/flaskapi";
import CnpResultPaperC from "../Components/CnpResultPaperC";

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

const semesters = [
  {
    id: 1,
    name: "S1",
  },
  {
    id: 2,
    name: "S2",
  },
  {
    id: 12,
    name: "S1 et S2",
  },
];
function CalcNotesP() {
  const [sNotes, setSNotes] = useState(null);
  const [mark, setMark] = useState(null);
  const [modulesNotes, setModulesNotes] = useState(null);
  const [sData, setSData] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [semester, setSemester] = useState(semesters[1].id);
  const handleSendNotes = () => {
    async function calcNoteFct() {
      const data = {
        semester: semester,
        user_el_modules_notes: sNotes,
      };
      await JinaepFlaskAPI.calcNote(data).then((res) => {
        setMark(res.data.final_note);
        setModulesNotes(res.data.module_notes);
        setSuggestions(res.data.suggestions);
      });
    }
    calcNoteFct();
  };
  useEffect(() => {
    async function getDataFct() {
      await JinaepFlaskAPI.getData(semester).then((res) => {
        setSData(res.data);
        var y_ = [];
        res.data.el_module_ids.forEach((module_) => {
          y_.push(new Array(module_.length).fill(12));
        });
        setSNotes(y_);
      });
    }
    getDataFct();
  }, [semester]);
  return (
    <Container maxWidth="lg">
      <TopNavbarC />
      <FormControl
        style={{
          width: 120,
          marginBottom: 8,
        }}>
        <InputLabel id="select-semester">Semestre</InputLabel>
        <Select
          labelId="select-semester"
          id="demo-mutiple-name"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          input={<Input />}>
          {semesters.map((smstr) => (
            <MenuItem
              disabled={smstr.id === 12}
              key={smstr.id}
              value={smstr.id}>
              {smstr.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Module</StyledTableCell>
              <StyledTableCell align="left">Element de module</StyledTableCell>
              <StyledTableCell align="left">Notes finales</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sData &&
              sData.module_names.map((m_name, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {m_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {sData.el_module_names[index].map((em_name, index_) => (
                      <StyledTableRow key={index_}>
                        <StyledTableCell>{em_name}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {sNotes &&
                      sNotes[index].map((note, index_) => (
                        <StyledTableRow key={index_}>
                          <StyledTableCell>
                            <Input
                              type="number"
                              value={sNotes[index][index_]}
                              placeholder="12.00"
                              onChange={(e) => {
                                sNotes[index][index_] = parseFloat(
                                  e.target.value
                                );
                                setSNotes([...sNotes]);
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          width: "100%",
          display: "flex",
          marginTop: 8,
          flexDirection: "row-reverse",
        }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendNotes}
          endIcon={<TelegramIcon />}>
          Get Mark
        </Button>
      </div>
      {mark && modulesNotes && suggestions ? (
        <CnpResultPaperC
          mark={mark}
          sData={sData}
          sNotes={sNotes}
          semester={semester}
          modulesNotes={modulesNotes}
          suggestions={suggestions}
        />
      ) : null}
    </Container>
  );
}

export default CalcNotesP;
