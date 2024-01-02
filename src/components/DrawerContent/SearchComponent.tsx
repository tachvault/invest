import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { setCurrentStock } from "@/store/stock";
import { useDispatch, useSelector } from "react-redux";
import { FlexDiv } from "./StyledItems";

// Function to fetch symbol data from a third-party API
export const getSymbolData = async (symbol) => {
  try {
    const apiUrl = `https://yahoo-finance127.p.rapidapi.com/price/${symbol}`;
    const response = await axios.get(apiUrl, {
      headers: {
        'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com',
        'X-RapidAPI-Key': 'dae743fa0amsh17dc2b56b5d16c0p1f1708jsn8df11aaf99f3',
      },
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

const Search = ({ getResults, shouldHandle, handleOptionSelected, showResult=true }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false);
  const {currentStock} = useSelector((state)=>state.stock);
  const handleSearchChange = (event) => {
    // Update the search term as the user types
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };
  const dispatch  = useDispatch();
  // Function to fetch price data for the selected option
  const fetchPriceData = async (option) => {
    try {
      const priceData = await getSymbolData(option?.symbol);
      console.log("Price Data:", priceData);
      return priceData;
      // You can do something with the price data here
    } catch (error) {
      console.error("An error occurred while fetching price data:", error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const apiUrl = `https://yahoo-finance127.p.rapidapi.com/search/${searchTerm}`;

      // Make an API request to search for quotes based on the search term
      axios
        .get(apiUrl, {
          headers: {
            'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com',
            'X-RapidAPI-Key': 'dae743fa0amsh17dc2b56b5d16c0p1f1708jsn8df11aaf99f3',
          },
        })
        .then((response) => {
          const data = response?.data;
          const quotes = data?.quotes || [];
          setSearchResults(quotes);
          getResults(quotes);
          setOpen(true);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    } else {
      setSearchResults([]);
      setOpen(false);
    }
  }, [searchTerm]);

  return (
    <div>
      <Autocomplete
        onInputChange={handleSearchChange}
        options={searchResults}
        getOptionLabel={(option) => option?.shortname + ` (${option?.symbol})`}
        open={open}
        disableClearable
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={selectedOption}
        onChange={async (event, newValue) => {
          
          setSelectedOption(newValue);
          // Call the function to fetch price data when an option is selected
          if (newValue) {
            const response = await fetchPriceData(newValue);
            dispatch(setCurrentStock(response));
            if(shouldHandle){
              console.log(newValue, 'value',{...response, ...newValue});

              handleOptionSelected({...response, ...newValue});
            }
          }
          // if (shouldHandle) {
            
          // }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Search quotes"
            InputProps={{
              ...params.InputProps,
              type: "search",
              startAdornment: (
                <SearchIcon />
              ),
            }}
          />
        )}
      />
    {currentStock && showResult ? <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px', marginTop: '20px'}}>
      <div>
        <i>Symbol</i> : <b>{currentStock?.symbol?? 'N/A'}</b>
      </div>
      <div>
        <i>Name</i> : <b>{currentStock?.longName?? 'N/A'}</b>
      </div>
      <div>
        <i>Currency</i> : <b>{currentStock?.currency?? 'N/A'}</b>
      </div>
      <div>
        <i>Ask</i> : <b>{currentStock?.ask?.fmt?? 'N/A'}</b>
      </div>
      <div>
        <i>Bid</i> : <b>{currentStock?.bid?.fmt?? 'N/A'}</b>
      </div>
      <div>
        <i>Two hundred days average</i>: <b>{currentStock?.twoHundredDayAverageChangePercent?.fmt}</b>
      </div>
      <div>
        <i>Divident Date</i>: <b>{currentStock?.dividendDate?.fmt?? 'N/A'}</b>
      </div>
      <div>
        <i>Divident Rate</i>: <b>{currentStock?.dividendRate?.fmt?? 'N/A'}</b>
      </div>
      <div>
        <i>Avg analyst rating</i>: <b>{currentStock?.averageAnalystRating?? 'N/A'}</b>
      </div>
      <div>
        <i>EPS forward</i>: <b>{currentStock?.epsForward?.fmt?? 'N/A'}</b>
      </div>
    </div> : <></>}
    </div>
  );
};

export default Search;
