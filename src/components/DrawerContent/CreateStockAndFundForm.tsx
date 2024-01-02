import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HoldingSearch from './HoldingsSearchComponent';
import AddTransactionForm from './AddTransactionForm';



const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 600,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 'none',
    borderRadius: '6px',
    p: 2,
};

// Functional component for creating a stock and fund form
export default function CreateStockAndFundForm(props: any) {
    const [selectedOption, setSelectedOption] = useState(null); // State for the selected option
    const [shares, setShares] = useState(0); // State for the number of shares
    
    // Close the modal
    const handleClose = () => {
        setSelectedOption(null);
        props.onClose();
    };

    return (
        <div>
            <Modal
                open={props.open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize: '16px', fontWeight: 600, paddingBottom: '0px', display: 'flex', justifyContent: 'space-between' }}>
                        Add Stock and Fund to {props.portfolio?.name} <span style={{ color: 'grey', }}>{shares} shares</span>
                    </Typography>

                    {selectedOption ? (
                        <>
                            <AddTransactionForm handleShares={setShares} selectedOption={selectedOption} portfolio={props.portfolio} close={handleClose} />
                        </>
                    ) : (
                        <HoldingSearch onOptionSelected={setSelectedOption} handleClose={handleClose} />
                    )}
                </Box>
            </Modal>
        </div>
    );
}