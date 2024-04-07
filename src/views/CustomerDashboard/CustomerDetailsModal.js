import React from 'react';
import { Button, Modal, Box, Typography, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function CustomerDetailsModalFUNC({ openModal, handleCloseModal, handleAddress, location }) {
  const navigate = useNavigate();

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
  const handleClick = () => {
    navigate('/JobDashboard');
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
        <Box sx={{ textAlign: 'right' }}>
          <Button style={buttonStyle} onClick={handleCloseModal} variant="contained" disableElevation>
            <CloseIcon />
          </Button>
        </Box>
        <Grid container spacing={0.5}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ my: 2, p: 2, ml: 1 }}>
              <Typography
                variant="h5"
                component="h2"
                style={{
                  fontFamily: 'Quicksand, Verdana, sans-serif',
                  fontWeight: 700,
                  fontSize: '19px',
                  lineHeight: '23px',
                  color: 'black'
                }}
              >
                Customer notes
              </Typography>
              <Typography
                variant="h5" // You can adjust the variant to match the desired size and weight.
                component="h2"
                style={{
                  fontFamily: 'Nunito Sans, Arial, sans-serif',
                  fontWeight: 400,
                  color: 'rgb(98, 108, 114)',
                  fontSize: '14px',
                  lineHeight: '26px'
                }}
              >
                Dont cut the grass too short
                <br /> Dont cut my Dam Roses <br /> I will write a check
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ my: 2, p: 2, ml: 1 }}>
              <Typography
                variant="h5"
                component="h2"
                style={{
                  fontFamily: 'Quicksand, Verdana, sans-serif',
                  fontWeight: 700,
                  fontSize: '19px',
                  lineHeight: '23px',
                  color: 'black'
                }}
              >
                Go To Project
              </Typography>

              <Button variant="contained" onClick={() => handleClick()}>
                See Job Details
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ my: 2, p: 2, ml: 1 }}>
              <Typography
                variant="h5"
                component="h2"
                style={{
                  fontFamily: 'Quicksand, Verdana, sans-serif',
                  fontWeight: 700,
                  fontSize: '19px',
                  lineHeight: '23px',
                  color: 'black'
                }}
              >
                Get Directions?
              </Typography>

              <Button variant="contained" onClick={() => handleAddress()}>
                Get Directions to {location.label}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default CustomerDetailsModalFUNC;
