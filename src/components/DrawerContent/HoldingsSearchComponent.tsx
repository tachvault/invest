import React, { useState, useEffect, Fragment } from "react";
import Search from "./SearchComponent";
import {
  FlexDiv,

  StyledButtonTwo,
} from "./StyledItems";
// Dummy data used by HoldingSearch component to simulate real-life searches
const dummyHoldingSearchData = [
  {
    id: 1,
    name: "Amazon.com Inc",
    tag: "AMZN",
  },
  {
    id: 2,
    name: "Apple Inc",
    tag: "AAPL",
  },
  {
    id: 3,
    name: "Fidelity® 500 Index",
    tag: "FXAIS",
  },
  {
    id: 4,
    name: "Morningstar Inc",
    tag: "MORN",
  },
  {
    id: 5,
    name: "Tesla Inc",
    tag: "TSLA",
  },
];

/* HoldingSearch component that displays a search input.
   The component results the visual structure of the visual search. */
const HoldingSearch = ({ onSearchResults, onOptionSelected, handleClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
 
  // Function to handle the selected option
  const handleOptionSelected = (option) => {
    onOptionSelected(option);
  };

  useEffect(() => {
    if (searchTerm) {
      const filteredResults = dummyHoldingSearchData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

   // Function to update search results
  const getResults = (data) => {
    setSearchResults(data);
  };

  return (
    <div style={{marginTop: '20px'}}>
      <Search
        getResults={getResults}
        shouldHandle={true}
        showResult={false}
        handleOptionSelected={handleOptionSelected}
      />
      <div
        style={{ width: "100%", padding: "40px 0px" }}
      >
        <FlexDiv justifyContent="start">
          <StyledButtonTwo style={{    margin: '400px auto  0px 0px'}} onClick={handleClose}>Cancel</StyledButtonTwo>
        </FlexDiv>
      </div>
    </div>
  );
};

export default HoldingSearch;
