import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, Grid } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { Typography } from '@mui/material';

function CustomerDetailsModalFUNC({ openModal, handleCloseModal, selectedUser, showToast }) {
  const isLessThan600 = useMediaQuery('(max-width:600px)');
  const buttonStyle = {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: 'red',
    padding: '1px 1px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    marginTop: '10px'
  };
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    email: '',
    phone: '',
    phone2: '',
    companyName: '',
    tag: [], // Array for tags
    city: '',
    state: '',
    zip: '',
    notes: '',
    billingSameAddress: false, // Boolean for billing address
    invoices: '', // String for invoices
    activeJobs: 0, // Default as integer
    quotes: 0, // Default as integer
    scheduledJobs: 0, // Default as integer
    frequencies: '', // String for frequency
    status: 'Active', // String for status
    nextServiceDate: null, // String for date, ensure proper format
    service: [], // Array for services
    activeCustomer: true // Boolean for active status
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        firstName: selectedUser.firstName || '',
        lastName: selectedUser.lastName || '',
        address: selectedUser.address || '',
        address2: selectedUser.address2 || '',
        email: selectedUser.email || '',
        phone: selectedUser.phone || '',
        phone2: selectedUser.phone2 || '',
        companyName: selectedUser.companyName || '',
        tag: Array.isArray(selectedUser.tag) ? selectedUser.tag : selectedUser.tag ? JSON.parse(selectedUser.tag) : [], // Parse if string, default to array
        city: selectedUser.city || '',
        state: selectedUser.state || '',
        zip: selectedUser.zip || '',
        notes: selectedUser.notes || '',
        billingSameAddress: !!selectedUser.billingSameAddress, // Force to boolean
        invoices: selectedUser.invoices || '',
        activeJobs: Number.isInteger(selectedUser.activeJobs) ? selectedUser.activeJobs : 0, // Ensure integer
        quotes: Number.isInteger(selectedUser.quotes) ? selectedUser.quotes : 0, // Ensure integer
        scheduledJobs: Number.isInteger(selectedUser.scheduledJobs) ? selectedUser.scheduledJobs : 0, // Ensure integer
        frequencies: selectedUser.frequencies || '',
        status: selectedUser.status || 'Active',
        nextServiceDate: selectedUser.nextServiceDate || null, // Ensure proper format
        service: Array.isArray(selectedUser.service) ? selectedUser.service : selectedUser.service ? JSON.parse(selectedUser.service) : [], // Parse if string, default to array
        activeCustomer: !!selectedUser.activeCustomer // Force to boolean
      });
    }
  }, [selectedUser]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/listings/customers/update/${selectedUser.id}`, formData);
      console.log('Customer updated:', response.data);

      showToast('Customer updated successfully!', 'success');
      handleCloseModal();
    } catch (error) {
      console.error('Error updating customer:', error);
      showToast('Failed to update customer.', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/listings/customers/delete/${selectedUser.id}`);
      if (response.status === 204 || response.status === 200) {
        showToast('Customer deleted successfully!', 'success');
        handleCloseModal();
        refreshPage();
      } else {
        showToast('Failed to delete customer.', 'error');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      showToast('Failed to delete customer.', 'error');
    }
  };

  const refreshPage = () => {
    window.location.reload();
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
          height: '95vh',
          overflowY: 'auto'
        }}
      >
        {/* //////////////////////// */}
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#eeeeee',
              border: '1px solid black',
              padding: 2, // Adjust padding as needed
              borderRadius: 1,
              width: '100%',
              marginBottom: '20px'
            }}
          >
            <Typography variant="h6">Lawn Care Customer Details</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Button style={buttonStyle} onClick={handleCloseModal} variant="contained" disableElevation>
              <CloseIcon />
            </Button>
          </Box>
          <Grid container spacing={0.5} justifyContent="center" alignItems="center">
            <Stack sx={{ textAlign: 'center', width: '100%' }} spacing={2}>
              <TextField label="First Name" value={formData.firstName} onChange={handleChange('firstName')} fullWidth />
              <TextField label="Last Name" value={formData.lastName} onChange={handleChange('lastName')} fullWidth />
              <TextField label="Address" value={formData.address} onChange={handleChange('address')} fullWidth />
              <TextField label="Address 2" value={formData.address2} onChange={handleChange('address2')} fullWidth />
              <TextField label="Email" value={formData.email} onChange={handleChange('email')} fullWidth />
              <TextField label="Phone" value={formData.phone} onChange={handleChange('phone')} fullWidth />
              <TextField label="Phone 2" value={formData.phone2} onChange={handleChange('phone2')} fullWidth />
              <TextField label="Company Name" value={formData.companyName} onChange={handleChange('companyName')} fullWidth />
              <TextField label="Tag" value={formData.tag} onChange={handleChange('tag')} fullWidth />
              <TextField label="City" value={formData.city} onChange={handleChange('city')} fullWidth />
              <TextField label="State" value={formData.state} onChange={handleChange('state')} fullWidth />
              <TextField label="ZIP" value={formData.zip} onChange={handleChange('zip')} fullWidth />
              <TextField label="Notes" multiline rows={4} value={formData.notes} onChange={handleChange('notes')} fullWidth />
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete Customer
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default CustomerDetailsModalFUNC;
