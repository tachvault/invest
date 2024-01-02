import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import "react-datepicker/dist/react-datepicker.css";
import { addNewStock } from "@/store/stock";
import { useDispatch, useSelector } from "react-redux";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  StockListFormContainer,
  StockListFormWrapper,
  AddTransactionFormContainer,
  AddAnotherTransactionButton,
  StyledModal,
  TransactionDiv,
  ModalButtonContainer
} from "./StyledItems";

// Define options for transaction type (Buy/Sell)
const options = [
  { label: "Buy", value: "Buy" },
  { label: "Sell", value: "Sell" },
];

function formatDate(inputDate) {
  const dateObject = new Date(inputDate);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return dateObject.toLocaleDateString("en-US", options);
}

// Define and export the AddTransactionForm component
export default function AddTransactionForm({
  close,
  selectedOption,
  portfolio,
  handleShares,
}) {
  const [startDate, setStartDate] = useState(new Date()); // Start date for the transaction
  const [selectType, setSelectType] = useState(); // Transaction type (Buy/Sell)
  const [shares, setShares] = useState("");   // Number of shares    
  const [sharePrice, setSharePrice] = useState(selectedOption.live_price); // Share price
  const [commission, setCommission] = useState(""); // Commission
  const [transactions, setTransactions] = useState([]); // Array to store multiple transactions
  const [isFormOpen, setIsFormOpen] = useState(true); // Flag to control the form's visibility


  // Redux setup for dispatching actions and accessing state
  const dispatch = useDispatch();
  const { currentStock } = useSelector((state) => state.stock);

  // Function to open the form for adding a new transaction
  const handleAddTransaction = () => {
    setIsFormOpen(true);
  };

  // Function to close the form for adding a new transaction
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  // Function to close the entire AddTransactionForm component
  const handleClose = () => {
    close();
  };

  // Function to calculate the net shares after considering all transactions
  function calculateNetShares(transactions) {
    let boughtShares = 0;
    let soldShares = 0;

    for (const transaction of transactions) {
      if (transaction.type === 0) {
        // Buy transaction
        boughtShares += parseInt(transaction.shares, 10);
      } else if (transaction.type === 1) {
        // Sell transaction
        soldShares += parseInt(transaction.shares, 10);
      }
    }

    const netShares = boughtShares - soldShares;

    return netShares;
  }

  // Function to handle the submission of the transaction form
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(sharePrice, shares, 'shares');
    if(!sharePrice && !shares){
      setIsFormOpen(false);
      return
    }
    // Create a new transaction data object
    const data = {
      type: selectType,
      date: startDate,
      shares: shares,
      price: sharePrice,
      commission: commission,
      ...selectedOption,
    };
    console.log(transactions, data, "data");
    // Add the new transaction to the array
    setTransactions([...transactions, data]);

    // Reset form fields
    setSelectType("");
    setShares("");
    setSharePrice(selectedOption.live_price);
    setCommission("");
    setIsFormOpen(false);

    // Update the parent component with the net shares value
    handleShares(calculateNetShares([...transactions, data]));
  };

  // Function to handle changes in the number of shares
  const handleSave = () => {
    dispatch(
      addNewStock(portfolio.id, transactions, calculateNetShares(transactions))
    );
    handleClose();
  };
  const handleShareChange = (event) => {
    const sharesValue = event.target.value;
    setShares(sharesValue);
    setSharePrice(parseFloat(currentStock?.regularMarketPrice?.fmt * sharesValue).toFixed(2));
    
  };

  // Generate the current date in a specific format
  const currentDate = new Date();
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  // Function to handle the deletion of a transaction
  const handleDelete = (toDeleteIndex) => {
    console.log('toDeleteIndex', toDeleteIndex, transactions)

    // Remove the specified transaction from the transactions array
    transactions.splice(toDeleteIndex, 1);
  
    // Set the state with the modified transactions array
    setTransactions([...transactions]);
    handleShares(calculateNetShares(transactions))
  }
  
  // Render the AddTransactionForm component
  return (
    <AddTransactionFormContainer>
      <AddAnotherTransactionButton>
        <Button
          variant="text"
          style={{ textTransform: "capitalize" }}
          color="primary"
          onClick={handleAddTransaction}
        >
          + Add another transaction for {currentStock.shortName}
        </Button>
      </AddAnotherTransactionButton>

      {isFormOpen && (
        <StyledModal
          className="modal"
        >
          <form onSubmit={handleSubmit}>
            <Typography
              sx={{ fontSize: "14px", fontWeight: 600, paddingBottom: "8px" }}
            >
              Add Transaction for
              {currentStock ? currentStock?.shortName : "No selected option"}
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Box display="flex" sx={{ mb: 2 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectType}
                fullWidth
                variant="filled"
                label="Select"
                onChange={(e) => {
                  setSelectType(e.target.value);
                }}
              >
                <MenuItem value={0}>Buy</MenuItem>
                <MenuItem value={1}>Sell</MenuItem>
              </Select>
              <input
                type="date"
                style={{
                  width: "250px",
                  background: "#F5F5F5",
                  border: "none",
                  borderBottom: "1px solid #333",
                }}
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </Box>
            <Box display="flex">
              <TextField
                label="Enter shares"
                fullWidth
                type="number"
                variant="filled"
                value={shares}
                onChange={handleShareChange}
              />

              <TextField
                label="Price"
                fullWidth
                type="number"

                variant="filled"
                value={sharePrice}
                onChange={(e) => {
                  console.log(e.target.value, 'value');
                  if(e.target.value){
                  setSharePrice(parseFloat(e.target.value));
                  }else{
                    setSharePrice(0)
                  }
                }}
                sx={{ ml: 2, mr: 2 }}
                InputLabelProps={{ shrink:  true  }}
              />
              <TextField
                label="Add commission"
                fullWidth
                type="number"

                variant="filled"
                value={commission}
                onChange={(event) => setCommission(event.target.value)}
              />
            </Box>
            <Box
              display="flex"
              flexDirection={"row-reverse"}
              justifyContent="space-between"
              sx={{ mt: 2 }}
            >
              <Button
                type="submit"
                variant="contained"
                style={{ background: "#2896fc", borderRadius: "30px" }}
                color="primary"
              >
                Save
              </Button>
              <Button
                variant="outlined"
                style={{
                  border: "1px solid grey",
                  color: "grey",
                  textTransform: "capitalize",
                  borderRadius: "20px",
                }}
                onClick={handleCloseForm}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </StyledModal>
      )}

      {transactions.map((transaction, index) => (
        <StockListFormContainer>
          <StockListFormWrapper>
            {" "}
            <span>{transaction.type === 0 ? "Buy" : "Sell"} </span>{" "}
            <span style={{ paddingRight: "5px", display: 'flex', flexDirection: 'column', alignItems: 'right', }}>
              $ {transaction.price}
              <span style={{ cursor: 'pointer', marginLeft: '33px', zIndex: 1 }}>
                <DeleteIcon onClick={() => handleDelete(index)} />
              </span>
            </span>
          </StockListFormWrapper>
          <TransactionDiv>
            {" "}
            <span style={{ color: "#333", fontSize: "14px" }}>
              {formatDate(transaction.date)}{" "}
              <span style={{ color: "lightgrey" }}>&#x2022;</span>{" "}
              {transaction.shares} Shares{" "}
            </span>
          </TransactionDiv>
        </StockListFormContainer>
      ))}
      <ModalButtonContainer>
        <Button
          variant="outlined"
          style={{
            border: "1px solid grey",
            color: "grey",
            textTransform: "capitalize",
            borderRadius: "20px",
            marginTop: "180px",
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          style={{
            border: "1px solid #fff",
            color: "#fff",
            textTransform: "capitalize",
            background: "#209af5",
            borderRadius: "20px",
            marginTop: "180px",
          }}
          onClick={handleSave}
        >
          Save
        </Button>
      </ModalButtonContainer>
    </AddTransactionFormContainer>
  );
}
