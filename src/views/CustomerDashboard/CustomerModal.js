import React from 'react';
import { Modal, Typography } from '@mui/material';

function CustomerModal({ handleCloseCustomerModal, openCustomerModal }) {
  return (
    <Modal
      open={openCustomerModal}
      onClose={handleCloseCustomerModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Typography>hey</Typography>
    </Modal>
  );
}

export default CustomerModal;
