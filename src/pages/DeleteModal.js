import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { DeletAllResponse, DeletesubResponse } from '../services/Service';
import { deleteSubscription } from '../slices/subscriptionSlice';
import SuccessToast from '../toast/Success';
import ErrorToast from '../toast/Error';

const DeleteModal = ({ openDeleteModal, setOpenDelete, id, setSelected }) => {
  console.log(id,"idssssssss");
  const dispatch = useDispatch();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    // boxShadow: 24,
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
        <Box sx={{ ...style, width: 450, height: 180, pt: 3 }}>
          <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
            Do you sure want to Delete Data?
          </DialogTitle>

          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ display: 'flex', mt: 1 }}>
              <Button
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("id.legth" , id);
                  if (id[0].length > 1) {
                    console.log('handle all',id );
                    handleDeleteAll(id[0]);
                  } else {
                    console.log('handle 1',id);
                    handledelete(id);
                  }
                  setOpenDelete(false);
                }}
              >
                Yes
              </Button>
            </Box>

            <Box sx={{ display: 'flex', ml: 3, mt: 1 }}>
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
        </Box>
      </Modal>
    </>
  );
};

export default DeleteModal;
