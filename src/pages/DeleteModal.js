import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Modal } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { DeletAllResponse, DeletesubResponse } from '../services/Service';
import { deleteSubscription } from '../slices/subscriptionSlice';
import SuccessToast from '../toast/Success';
import ErrorToast from '../toast/Error';

const DeleteModal = ({ openDeleteModal, setOpenDelete, id, setSelected }) => {
  const dispatch = useDispatch();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const handledelete = (val) => {
    DeletesubResponse(val)
      .then((res) => {
        if (res.data.success === true) {
          dispatch(deleteSubscription(val));
          setSelected([]);
          SuccessToast('Successfully Deleted');
        }
      })
      .catch((err) => {
        ErrorToast(err.message);
      });
  };

  const handleDeleteAll = (selectedIDs) => {
    DeletAllResponse(selectedIDs)
      .then((res) => {
        if (res.data.success === true) {
          dispatch(deleteSubscription(selectedIDs));
          setSelected([]);
          SuccessToast('Succesfully deleted');
        }
      })
      .catch((err) => {
        ErrorToast(err.message);
      });
  };

  return (
    <>
      <Modal
        hideBackdrop
        open={openDeleteModal}
        // onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
            Deleting Subscription is Successful
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{ mb: 2, textAlign: 'center' }}>
              Do you sure want to Delete Data?
            </DialogContentText>

            <Box
              sx={{
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    if (id.length > 1) {
                      console.log('handle all');
                      handleDeleteAll(id);
                    } else {
                      console.log('handle 1');
                      handledelete(id);
                    }
                    setOpenDelete(false);
                  }}
                >
                  Yes
                </Button>
              </Box>

              <Box sx={{ display: 'flex', mb: 2, ml: 3 }}>
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenDelete(false);
                  }}
                >
                  No
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Box>
      </Modal>
      {/* <Dialog
          open={openDeleteModal}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth={'sm'}
        >
          <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
            Deleting Subscription is Successful
          </DialogTitle>
  
          <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{ mb: 2, textAlign: 'center' }}>
              Do you sure want to Delete Data?
            </DialogContentText>
  
            <Box sx={{ display: 'flex', flexFlow: 'row', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Button variant="contained" onClick={(id) => handledelete(id)}>
                  Yes
                </Button>
              </Box>
  
              <Box sx={{ display: 'flex', mb: 2, ml: 3 }}>
                <Button variant="contained" onClick={setOpenDeleteModal}>
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
          </DialogActions> 
        </Dialog> */}
    </>
  );
};

export default DeleteModal;
