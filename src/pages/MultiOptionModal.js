import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Modal, Typography } from '@mui/material';
import { deleteSubscription } from '../slices/subscriptionSlice';
import { ChangeStatusResponse, DeletesubResponse } from '../services/Service';
import SuccessToast from '../toast/Success';
import ErrorToast from '../toast/Error';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #FFF',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const MultiOptionModal = ({ openOptionModal, setOpenOptionModal, handleClickOpen, setOpenSubModal, id }) => {
  //   const [open, setOpen] = React.useState(openOptionModal);
  //   const handleOpen = () => setOpen(true);

  const dispatch = useDispatch();

  const handleClose = () => {
    handleClickOpen();
    setOpenOptionModal(false);
  };
  return (
    <>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={openOptionModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
            Subscription Already Exist!!!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} align="center">
            Which Action Do you Want to Perform?
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, justifyContent: 'space-around' }}>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <Button
                variant="contained"
                onClick={() => {
                  ChangeStatusResponse(id, 'Inactive').then((res) => {
                    console.log('change status => ', res.data);
                  });
                  handleClose();
                }}
                sx={{ borderRadius: '30px',backgroundColor: '#3D71FF', }}
              >
                Inactive
              </Button>
            </Box>

            <Box sx={{ display: 'flex', mb: 2 }}>
              <Button
                variant="contained"
                onClick={() => {
                  DeletesubResponse(id)
                    .then((res) => {
                      console.log('deleted ', res);
                      if (res.data.success === true) {
                        setOpenOptionModal(false);
                        setOpenSubModal(false);
                        dispatch(deleteSubscription(id));
                        // setSelected([]);
                        SuccessToast('Successfully Deleted');
                      }
                    })
                    .catch((err) => {
                      ErrorToast(err.message);
                    });
                }}
                sx={{ borderRadius: '30px',backgroundColor: '#3D71FF',}}
              >
                Delete
              </Button>
            </Box>

            <Box sx={{ display: 'flex', mb: 2 }}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenOptionModal(false);
                  setOpenSubModal(false);
                }}
                sx={{ borderRadius: '30px',backgroundColor: '#3D71FF', }}
              >
                Ignore
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default MultiOptionModal;
