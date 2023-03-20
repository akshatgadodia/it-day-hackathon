import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDisconnect } from 'wagmi'
import UserRegistrationForm from '../Pages/UserRegistrationForm';
import AddLandForm from '../Pages/AddLandForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalBox(props) {
  const { disconnect } = useDisconnect()
  const handleClose = () => { 
    props.setOpen(false); 
    disconnect();
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.type==="user-registration" ? handleClose : ()=>{props.setOpen(false);}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {(props.type==="user-registration") && <UserRegistrationForm handleClose={handleClose}/>}
          {(props.type==="land-add") && <AddLandForm handleClose={()=>{props.setOpen(false);}}/>}

        </Box>
      </Modal>
    </div>
  );
}