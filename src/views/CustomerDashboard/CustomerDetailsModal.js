import React, { useState } from 'react';
import { Button, Modal, Box, Grid } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
function CustomerDetailsModalFUNC({ openModal, handleCloseModal }) {
  const isLessThan600 = useMediaQuery('(max-width:600px)');
  const buttonStyle = {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: 'red',
    padding: '1px 1px', // Adjust padding as needed
    cursor: 'pointer',
    fontSize: '0.8rem',
    marginTop: '10px'
  };
  const [formData] = useState({
    firstName: 'Isabella',
    lastName: 'Christensen',
    address: '123 Main St',
    serviceItem: 'None',
    date: '2024-05-01T12:56:00',
    lorem: 'Lorem Ipsum is simply...',
    equipmentReady: false,
    businessName: 'Hansen Landscaping',
    phoneNumber: '910-233-2233',
    activeJobs: 1,
    requests: 2,
    quotes: 1,
    jobs: 5,
    invoices: 'Unpaid'
  });
  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isLessThan600 ? 350 : 900,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          height: '95vh', // Set maximum height
          overflowY: 'auto' // Allow vertical scrolling
        }}
      >
        <Grid item xs={12} md={12}>
          <Box sx={{ textAlign: 'right' }}>
            <Button style={buttonStyle} onClick={handleCloseModal} variant="contained" disableElevation>
              <CloseIcon />
            </Button>
          </Box>
          <Grid container spacing={0.5}>
            <Stack spacing={2}>
              <TextField label="First Name" value={formData.firstName} onChange={handleChange('firstName')} fullWidth />
              <TextField label="Last Name" value={formData.lastName} onChange={handleChange('lastName')} fullWidth />
              <TextField label="Address" value={formData.address} onChange={handleChange('address')} fullWidth />
              <TextField label="Service Item" value={formData.serviceItem} onChange={handleChange('serviceItem')} fullWidth />
              <TextField label="Date" type="datetime-local" value={formData.date} onChange={handleChange('date')} fullWidth />
              <TextField label="Lorem" multiline rows={4} value={formData.lorem} onChange={handleChange('lorem')} fullWidth />
              <TextField label="Business Name" value={formData.businessName} onChange={handleChange('businessName')} fullWidth />
              <TextField label="Phone Number" value={formData.phoneNumber} onChange={handleChange('phoneNumber')} fullWidth />
              <TextField label="Active Jobs" type="number" value={formData.activeJobs} onChange={handleChange('activeJobs')} fullWidth />
              <TextField label="Requests" type="number" value={formData.requests} onChange={handleChange('requests')} fullWidth />
              <TextField label="Quotes" type="number" value={formData.quotes} onChange={handleChange('quotes')} fullWidth />
              <TextField label="Jobs" type="number" value={formData.jobs} onChange={handleChange('jobs')} fullWidth />
              <TextField label="Invoices" value={formData.invoices} onChange={handleChange('invoices')} fullWidth />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default CustomerDetailsModalFUNC;
