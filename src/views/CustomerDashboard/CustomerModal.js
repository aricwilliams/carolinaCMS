import React from 'react';
import { Modal, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Address from './Address';
import PropertyDetails from './PropertyDetails';
import Review from './Review';
import Stack from '@mui/material/Stack';
import { useMediaQuery } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Customer Information', 'Property details', 'Quick Service Addon & Notes'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Address />;
    case 1:
      return <PropertyDetails />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

function CustomerModal({ handleCloseCustomerModal, openCustomerModal }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const isLessThan600 = useMediaQuery('(max-width:600px)');

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
                  <Button variant="contained" sx={{ ml: 1 }}>
                    + Quote
                  </Button>
                </Stack>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
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
          <Copyright />
        </Container>
      </Box>
    </Modal>
  );
}

export default CustomerModal;
