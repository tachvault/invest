import * as React from 'react';
import {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { StyledInput, Label, FlexDiv, StyledButton , StyledButtonTwo} from './StyledItems';
import { editPortfolioName } from '@/store/stock';
import { useDispatch } from 'react-redux';

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

// Functional component for editing a portfolio name
export default function EditPortfolioName(props: any) {
    const [editedName, setEditedName] = useState(props.portfolio?.name || ''); // State for the edited name
    const [portfolio, setPortfolio] = useState(props.portfolio); 
    
    const dispatch = useDispatch();
    
    // updates the corresponding portfolio name
    const handleSave = () =>{
        dispatch(editPortfolioName({name: editedName, id: portfolio?.id}));
        handleClose(); // Close the modal
    }
    
    // closes the modal
    const handleClose = () => {
        props.onClose();
        setPortfolio({})
        setEditedName('');
    };
    
     // Use useEffect to update the state when the props change
    useEffect(()=>{
        setPortfolio(props?.portfolio)
        setEditedName(`${props?.portfolio?.name}`)
    }, [props?.portfolio?.name])

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
                        Rename Portfolio
                    </Typography>
                    <Label>
                        Name
                    </Label>
                    <StyledInput type="text" id="Name" name="name" value={editedName} onChange={(e) => setEditedName(e.target.value)}/>

                    <FlexDiv justifyContent='end' style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                        <StyledButtonTwo onClick={handleClose}>Cancel</StyledButtonTwo>
                        <StyledButton sx={{ right: 0}} onClick={handleSave}>Save</StyledButton>
                    </FlexDiv>

                </Box>
            </Modal>
        </div>
    );
}