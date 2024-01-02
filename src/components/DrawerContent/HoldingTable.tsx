import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const rows = [
  {
    type: 0,
    date: "2023-10-17",
    shares: "10",
    price: "2000",
    commission: "1",
    name: "INFOSYS LTD",
  },
];

// Functional component for displaying a table of stock holdings
export default function HoldingTable({ stocks }) {
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ticker</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Close Price</TableCell>
            <TableCell>High Price</TableCell>
            <TableCell>Low Price</TableCell>
            <TableCell>Open Price</TableCell>
            <TableCell>Shares</TableCell>
            <TableCell>Exchange</TableCell>
            <TableCell>Day change(%)</TableCell>
            <TableCell>Market Value Day change</TableCell>
            <TableCell>Commission</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.symbol}</TableCell>
              <TableCell>{row.shortname}</TableCell>
              <TableCell>${row.price}</TableCell>
              <TableCell>${row?.regularMarketDayHigh?.fmt}</TableCell>
              <TableCell>${row?.regularMarketDayLow?.fmt}</TableCell>
              <TableCell>${row?.regularMarketOpen?.fmt}</TableCell>
              <TableCell>{row.shares}</TableCell>
              <TableCell>{row.exchange}</TableCell>

              <TableCell>
                <span
                  style={{
                    color:
                      row.up_down_price > 0
                        ? "green"
                        : row.up_down_price < 0
                        ? "red"
                        : "#333",
                  }}
                >
                  {row.up_down_percent ? row.up_down_percent : 0} %
                </span>
              </TableCell>
              <TableCell>
                <span
                  style={{
                    color:
                      row.up_down_price > 0
                        ? "green"
                        : row.up_down_price < 0
                        ? "red"
                        : "#333",
                  }}
                >
                  {row.up_down_price}{" "}
                </span>
              </TableCell>
              <TableCell>${row.commission}</TableCell>
              <TableCell>{row.type === 0 ? "Buy" : "Sell"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
