import React, { useState } from 'react';
import { Modal, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Address from './Address';
import PropertyDetails from './PropertyDetails';
import Review from './Review';
import Stack from '@mui/material/Stack';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const steps = ['Customer Information', 'Property details', 'Quick Service Addon & Notes'];

function getStepContent(step, formData, handleInputChange) {
  switch (step) {
    case 0:
      return <Address formData={formData} handleInputChange={handleInputChange} />;
    case 1:
      return <PropertyDetails formData={formData} handleInputChange={handleInputChange} />;
    case 2:
      return <Review formData={formData} handleInputChange={handleInputChange} />;
    default:
      throw new Error('Unknown step');
  }
}

function CustomerModal({ handleCloseCustomerModal, openCustomerModal }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    phone2: '',
    companyName: '',
    tag: [], // This can be an array or null based on your backend handling
    address: '', // Renamed from address1 to address
    address2: '',
    email: '',
    city: '',
    state: '',
    zip: '',
    notes: '',
    billingSameAddress: true, // Corrected spelling
    invoices: '',
    activeJobs: '',
    quotes: '',
    scheduledJobs: '',
    frequencies: '',
    status: '',
    nextServiceDate: '', // Ensure this matches your backend date format
    activeCustomer: true,
    service: [] // This can be an array or null based on your backend handling
  });

  const isLessThan600 = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleClickQuote = () => {
    navigate('/ScheduleQuote');
  };
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleFormSubmit = () => {
    console.log('ff', formData);
    axios
      .post('http://localhost:3001/api/customers', formData)
      .then((response) => {
        console.log('Customer saved successfully', response);
      })
      .catch((error) => {
        console.error('There was an error saving the customer!', error);
      });
  };

  return (
    <Modal
      open={openCustomerModal}
      onClose={handleCloseCustomerModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto'
      }}
    >
      <Box
        sx={{
          // Ensuring the modal content is properly styled
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& .MuiPaper-root': {
            maxHeight: '85vh',
            overflowY: 'auto',
            width: isLessThan600 ? 350 : 750
          }
        }}
      >
        <CssBaseline />

        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Add New Customer
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Customer Added
                </Typography>
                <Stack direction={'row'}>
                  <Typography variant="subtitle1">Schedule a quote for this customer?</Typography>
                  <Button onClick={handleClickQuote} variant="contained" sx={{ ml: 1 }}>
                    + Quote
                  </Button>
                </Stack>
                <Button variant="contained" onClick={handleFormSubmit} sx={{ mt: 3, ml: 1 }}>
                  Submit
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, formData, handleInputChange)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button variant="contained" sx={{ mt: 3, ml: 1 }}>
                    Upload CSV File?
                  </Button>
                  <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                    {activeStep === steps.length - 1 ? 'Save Customer' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </Box>
    </Modal>
  );
}

export default CustomerModal;
