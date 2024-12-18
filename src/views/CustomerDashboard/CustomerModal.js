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
// import Stack from '@mui/material/Stack';
import { useMediaQuery } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const steps = ['Customer Information', 'Property details', 'Notes'];

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

function CustomerModal({ handleCloseCustomerModal, openCustomerModal, showToast }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    phone2: '',
    companyName: '',
    tag: [], // Array for tags
    address: '', // Primary address
    address2: '', // Secondary address
    email: '',
    city: '',
    state: '',
    zip: '',
    notes: '',
    billingSameAddress: true, // Boolean
    invoices: '',
    activeJobs: 0, // Default as integer
    quotes: 0, // Default as integer
    scheduledJobs: 0, // Default as integer
    frequencies: '', // Service frequency
    status: 'Active', // Customer status
    nextServiceDate: null, // Ensure proper date format
    activeCustomer: true, // Boolean
    service: [] // Array for services
  });

  const isLessThan600 = useMediaQuery('(max-width:600px)');
  // const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // const handleClickQuote = () => {
  //   navigate('/ScheduleQuote');
  // };
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleFormSubmit = () => {
    axios
      .post('http://127.0.0.1:8000/api/customers/new', formData)
      .then((response) => {
        console.log('Customer saved successfully', response);
        showToast('Customer updated successfully!', 'success');
        handleCloseCustomerModal();
        refreshPage();
      })
      .catch((error) => {
        console.error('There was an error saving the customer!', error);
        showToast('Failed to delete customer.', 'error');
        handleCloseCustomerModal();
      });
  };
  const refreshPage = () => {
    window.location.reload();
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
                {/* <Stack direction={'row'}>
                  <Typography variant="subtitle1">Schedule a quote for this customer?</Typography>
                  <Button onClick={handleClickQuote} variant="contained" sx={{ ml: 1 }}>
                    + Quote
                  </Button>
                </Stack> */}
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>

                <Button variant="contained" onClick={handleFormSubmit} sx={{ mt: 3, ml: 1 }}>
                  Save Customer!
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

                  <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                    {activeStep === steps.length - 1 ? 'Next' : 'Next'}
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
