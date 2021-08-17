import React from "react";
import { Button, Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const DataTable = ({
  servers,
  converter,
  converterSymbol,
  // funcs
  handleUpdate,
  handleDelete,
}) => {
  return (
    <TableContainer component={Paper} style={{ width: "80%" }}>
      <Table aria-label="simple table">
        <TableHead className="table-header">
          <TableRow>
            <TableCell align="center">Server name</TableCell>
            <TableCell align="center">IP Address</TableCell>
            <TableCell align="center">Time Runing</TableCell>
            <TableCell align="center">Run / Stop </TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {servers.map((server, index) => (
            <TableRow
              className={index % 2 ? "table-row-odd" : {}}
              key={server._id}
            >
              <TableCell component="th" scope="row" align="center">
                {server.server_name}
              </TableCell>
              <TableCell align="center">{server.ip_address}</TableCell>
              <TableCell align="center">
                {Math.floor((server.timer.time / (1000 * 3600)) % 60) < 10
                  ? "0" + Math.floor((server.timer.time / (1000 * 3600)) % 60)
                  : Math.floor((server.timer.time / (1000 * 3600)) % 60)}
                :
                {Math.floor((server.timer.time / (1000 * 60)) % 60) < 10
                  ? "0" + Math.floor((server.timer.time / (1000 * 60)) % 60)
                  : Math.floor((server.timer.time / (1000 * 60)) % 60)}
                :
                {Math.floor((server.timer.time / 1000) % 60) < 10
                  ? "0" + Math.floor((server.timer.time / 1000) % 60)
                  : Math.floor((server.timer.time / 1000) % 60)}
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => handleUpdate(server._id)}
                  color="primary"
                >
                  {server.isRunning ? "Stop" : "Run"}
                </Button>
              </TableCell>
              <TableCell align="center">{server.type.name}</TableCell>
              <TableCell align="center">
                {(server.type.price * converter).toFixed(2)}
                {converterSymbol}
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(server._id)}
                >
                  delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
