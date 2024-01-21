import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SortIcon from "@mui/icons-material/Sort";
import { HogwardsHouseData } from "../../App";
import { useState } from "react";

const HEADER_LABELS = ["Name", "Animal", "Ghost", "Common Room"];

export type TableComponentProps = {
  data: HogwardsHouseData[];
};

export default function TableComponent({ data }: TableComponentProps) {
  const [orderState, setOrderState] = useState<"asc" | "desc">("asc");

  const sortData = (a: HogwardsHouseData, b: HogwardsHouseData) => {
    if (orderState === "asc") {
      return a.name > b.name ? 1 : -1;
    }
    return a.name < b.name ? 1 : -1;
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="Information For Hogwards Houses">
        <TableHead>
          <TableRow>
            {HEADER_LABELS.map((header, index) => (
              <TableCell key={header}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {" "}
                  {header}{" "}
                  {index === 0 && (
                    <SortIcon
                      sx={{
                        cursor: "pointer",
                        marginLeft: "4px",
                        "&:hover": { fill: "darkblue" },
                      }}
                      onClick={() =>
                        setOrderState(orderState === "asc" ? "desc" : "asc")
                      }
                    />
                  )}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .sort((a, b) => sortData(a, b))
            .map((house) => (
              <TableRow
                key={house.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{house.name}</TableCell>
                <TableCell align="left">{house.animal}</TableCell>
                <TableCell align="left">{house.ghost}</TableCell>
                <TableCell align="left">{house.commonRoom}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
