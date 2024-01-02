import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { addNewPortfolio } from '@/store/stock';
import { useDispatch } from "react-redux";
import { StyledInput, Label, FlexDiv, StyledButton, StyledButtonTwo } from './StyledItems';


const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 370,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 'none',
    borderRadius: '6px',
    p: 2,
};

// Define a functional component for creating a new portfolio
export default function CreatePortfolioForm(props: any) {
    const [portfolioName, setPorfolioName] = useState(props.portfolio); // State to store the portfolio name
    const [nameRequired, setNameRequired] = useState(false);  // State to track if the name is required
    const dispatch = useDispatch();  // Access the Redux dispatch function

    // Close the modal
    const handleClose = () => {
        // Call the onClose function to close the modal
        props.onClose();
        setPorfolioName('');
    };

    // Handle the addition of a new portfolio
    const handleAddPorfolio = () => {
        if (!portfolioName) {
            // Name is required, set the state to display the message
            setNameRequired(true);
        } else {
            setNameRequired(false); // Clear the message if name is provided
            dispatch(addNewPortfolio({ name: portfolioName }));
            handleClose();
        }
    };


    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize: '16px', fontWeight: 600 }}>
                        Create New Portfolio
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 1, mb: 2, fontSize: '16px', fontWeight: 300 }}>
                        A portfolio is a way to group investments by goal or purpose. You can create more than one portfolio.
                    </Typography>
                    <Label>
                        Name
                    </Label>
                    <StyledInput
                        type="text"
                        id="Name"
                        name="name"
                        value={portfolioName}
                        onInput={(e) => {
                            setPorfolioName(e.target.value)
                            setNameRequired(false);
                        }}
                    />
                    {nameRequired && (
                        <p style={{ color: '#CA0000', marginTop: '0px' }}>Name is required</p>
                    )}

                    <FlexDiv justifyContent='end'>
                        <StyledButtonTwo onClick={handleClose}>Cancel</StyledButtonTwo>
                        <StyledButton sx={{ marginLeft: '10px' }} onClick={handleAddPorfolio}>Create Portfolio</StyledButton>
                    </FlexDiv>

                </Box>
            </Modal>
        </div>
    );
}