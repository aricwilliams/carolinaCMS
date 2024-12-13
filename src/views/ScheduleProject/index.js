import React from 'react';
import { Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Address from './Address';
import PropertyDetails from './PropertyDetails';
import Review from './Review';
import Stack from '@mui/material/Stack';
import Scheduling from './Scheduling';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const steps = ['Customer Information', 'Service Items', 'Scheduling', 'Notes & Attachments'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Address />;
    case 1:
      return <PropertyDetails />;
    case 2:
      return <Scheduling />;
    case 3:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

function CustomerModal() {
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleClickJob = () => {
    navigate('/JobDashboard');
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const isLessThan600 = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        // Ensuring the modal content is properly styled
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiPaper-root': {
          overflowY: 'auto',
          minWidth: isLessThan600 ? 350 : 900
        }
      }}
    >
      <CssBaseline />

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography component="h1" variant="h4" align="center">
          New Project
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
              Project Added!
            </Typography>
            <Stack direction={'row'}>
              <Typography variant="subtitle1">See project in dashboard?</Typography>
              <Button onClick={handleClickJob} variant="contained" sx={{ ml: 1 }}>
                See Project
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

              <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                {activeStep === steps.length - 1 ? 'Next' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
    </Box>
  );
}

export default CustomerModal;
