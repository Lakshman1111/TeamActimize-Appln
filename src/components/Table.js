import React from 'react';
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import TableContainer from "@mui/material/TableContainer";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import * as dayjs from 'dayjs';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const ResuableTable = React.memo(({ columns, data, editHandler, deleteHandler, showModal, hideActionsCell, showRemoveRedEyeIcon, hideDeleteIcon, allUsersData }) => {
  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.length > 0 &&
                columns?.map((column) => (
                  <StyledTableCell align="center" key={column.id}>
                    {column.label}
                  </StyledTableCell>
                ))}
              {!hideActionsCell && (<StyledTableCell align="center">Actions</StyledTableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data?.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  {columns.slice(1).map((column) => (
                    // <StyledTableCell
                    //   align="center"
                    //   component="th"
                    //   scope="row"
                    //   key={column.id} >
                    //   {column.id === 'expert_id' && allUsersData.find(user => user.id === row[column.id])?.name}
                    //   {column.id === "experience"
                    //     ? `${row.experience.years} Y ${row.experience.months} M`
                    //     : column.id === "date_of_join" || column.id === "start_date" ||column.id === "date_of_end" ||column.id === "created_at" || column.id === "end_date"
                    //       ? dayjs(row[column.id]).format("DD-MM-YYYY")
                    //       : column.id === "approval"
                    //         ? row[column.id] === false
                    //           ? "Not Approved"
                    //           : "Approved"
                    //         : row[column.id]}
                    // </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      component="th"
                      scope="row"
                      key={column.id} >
                      {column.id === 'expert_id' ? allUsersData.find(user => user.id === row[column.id])?.name : (
                        column.id === "experience"
                          ? `${row.experience.years} Y ${row.experience.months} M`
                          : column.id === "date_of_join"  || column.id === "date_of_end" ||column.id === "end_date" || 
                          column.id === "appreciation_date" || column.id === "start_date" ||column.id === "created_at" 
                            // ? dayjs(row[column.id]).format("DD-MM-YYYY")
                            // ?dayjs(row[column.id], "DD-MM-YYYY").format("DD-MM-YYYY")
                            // ?dayjs(row[column.id], "DD-MM-YYYY", true).isValid() ? dayjs(row[column.id], "DD-MM-YYYY").format("DD-MM-YYYY") : dayjs(row[column.id]).format("DD-MM-YYYY")
                            ?dayjs(row[column.id], "MM-DD-YYYY", true).isValid() 
                            ? dayjs(row[column.id], "MM-DD-YYYY").format("MM-DD-YYYY") 
                            : dayjs(row[column.id]).format("MM-DD-YYYY")
                          
                            : column.id === "approval"
                              ? row[column.id] === false
                                ? "Not Approved"
                                : "Approved"
                              : row[column.id]
                      )}
                    </StyledTableCell>
                  ))}
                  {!hideActionsCell && (
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      {showRemoveRedEyeIcon && (
                        <Link>
                          <RemoveRedEyeIcon onClick={() => showModal(row)} />
                        </Link>
                      )}
                      {!row.approval && (
                        <>
                          <Link>
                            <ModeEditIcon
                              sx={{ cursor: "pointer" }}
                              onClick={() => editHandler(row.id)}
                            />
                          </Link>
                          {!hideDeleteIcon && (
                            <Link>
                              <DeleteIcon
                                onClick={() => deleteHandler(row.id)}
                                sx={{ color: "red", cursor: "pointer" }}
                              />
                            </Link>
                          )}
                        </>
                      )}
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
});
export default ResuableTable;
