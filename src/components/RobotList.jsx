import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import RobotMap from "./RobotMap";
import "./RobotList.css";

const RobotList = () => {
  const [robots, setRobots] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { id: "Robot ID", label: "Robot ID", minWidth: 170 },
    { id: "Status", label: "Status", minWidth: 100 },
    { id: "Battery", label: "Battery", minWidth: 100 },
    { id: "CPU Usage", label: "CPU Usage", minWidth: 100 },
    { id: "RAM Consumption", label: "RAM Consumption", minWidth: 100 },
    { id: "Last Updated", label: "Last Updated", minWidth: 100 },
    { id: "Location", label: "Location", minWidth: 100 },
  ];

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://robot-fleet-monitoring-dashboard-backend.onrender.com/robots")
        .then((response) => {
          setRobots(response.data);
          setLoading(false);
          if (initialLoad) setInitialLoad(false);
        })
        .catch((error) => {
          console.error("Error fetching robot data:", error);
          setLoading(false);
          if (initialLoad) setInitialLoad(false);
        });
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [initialLoad]);

  const filteredRobots = robots
    .filter((robot) =>
      robot["Robot ID"].toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((robot) => {
      if (filterStatus === "All") return true;
      if (filterStatus === "Active") return robot["Online/Offline"];
      if (filterStatus === "Offline") return !robot["Online/Offline"];
      if (filterStatus === "Low Battery") return robot["Battery Percentage"] < 20;
      return true;
    });

  const getRowColor = (robot) => {
    if (robot["Battery Percentage"] < 20) return "#ffd580";
    if (robot["Online/Offline"]) return "#b3ffb3";
    return "#fff";
  };

  return (
    <div className="robot-dashboard">
      {initialLoad ? (
        <div className="table-loader">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="header">
            <h2>Robots Activity Status List</h2>
            <div className="legend">
              <span style={{ backgroundColor: "#b3ffb3", padding: "0 10px" }}></span> Online<br />
              <span style={{ backgroundColor: "#ffd580", padding: "0 10px" }}></span> Low Battery<br />
              <span style={{ backgroundColor: "#fff", padding: "0 10px" }}></span> Offline<br />
            </div>
          </div>

          <Paper sx={{ width: "80%" }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align || "left"}
                        style={{
                          backgroundColor: "#111",
                          fontWeight: "bold",
                          color: "#fff",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRobots
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((robot) => (
                      <TableRow
                        key={robot["Robot ID"]}
                        style={{
                          backgroundColor: getRowColor(robot),
                        }}
                      >
                        <TableCell>{robot["Robot ID"]}</TableCell>
                        <TableCell>
                          {robot["Online/Offline"] ? "Online" : "Offline"}
                        </TableCell>
                        <TableCell>{robot["Battery Percentage"]}%</TableCell>
                        <TableCell>{robot["CPU Usage"]}%</TableCell>
                        <TableCell>{robot["RAM Consumption"]} MB</TableCell>
                        <TableCell>{robot["Last Updated"]}</TableCell>
                        <TableCell>
                          {robot["Location Coordinates"]
                            ? `(${robot["Location Coordinates"].join(", ")})`
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={filteredRobots.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <div className="controls">
            <div className="search-bar">
              <TextField
                label="Search by Robot ID"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="filter-select">
              <FormControl fullWidth>
                <InputLabel>Status Filter</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Status Filter"
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Offline">Offline</MenuItem>
                  <MenuItem value="Low Battery">Low Battery</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          {!loading && <RobotMap robots={filteredRobots} />}
        </>
      )}
    </div>
  );
};

export default RobotList;
