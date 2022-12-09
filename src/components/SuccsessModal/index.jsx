import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Button, Box } from '@mui/material';

const SuccsessModal = ({ open, handleClose }) => {
  return (
    <>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth={'sm'}
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center', mb: 3 }}>
          Adding Subscription is Successful
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ mb: 3, textAlign: 'center' }}>
            Do you want to have reminder alert?
          </DialogContentText>

          <Box sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <Button variant="contained" onClick={handleClose}>
                Yes, Standard Alert
              </Button>
            </Box>

            <Box sx={{ display: 'flex', mb: 2 }}>
              <Button variant="contained" onClick={handleClose}>
                Yes, Customized Alert
              </Button>
            </Box>

            <Box sx={{ display: 'flex', mb: 2 }}>
              <Button variant="contained" onClick={handleClose}>
                No
              </Button>
            </Box>
          </Box>
        </DialogContent>

        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default SuccsessModal;
