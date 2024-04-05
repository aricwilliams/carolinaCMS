import React from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel, Modal, Box, Typography, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { equipmentList } from '../../EquipmentUtil';
import { useMediaQuery } from '@mui/material';

function CustomerDetailsModalFUNC({
  openModal,
  handleCloseModal,
  selectedUser,
  selectedEquipment,
  toolsByServiceItem,
  teamMembers,
  selectedMembers,
  expandValue,
  handleToggleChange,
  handleEquipmentChange,
  handleMemberToggle,
  handleInvoicePaid,
  handleAddress,
  location,
  expand,
  invoicePaid
}) {
  const isLessThan600 = useMediaQuery('(max-width:600px)');

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
        <Grid container spacing={0.5}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ my: 2, p: 2, mr: 1 }}>
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
                {selectedUser && selectedUser.serviceItem} Details
              </Typography>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {selectedUser?.equipmentReady ? (
                  <>
                    Hector Checked In Equipment
                    <CheckCircleIcon
                      style={{
                        color: 'blue'
                      }}
                    />
                  </>
                ) : (
                  <>
                    No one has Checked In Equipment
                    <DoNotDisturbIcon
                      style={{
                        color: 'red'
                      }}
                    />
                  </>
                )}
              </div>
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
                {selectedUser && (
                  <>
                    {toolsByServiceItem[selectedUser.serviceItem]?.map((tool, index) => (
                      <div key={index}>{tool}</div>
                    ))}
                    {selectedEquipment && selectedEquipment?.map((equipment, index) => <div key={index}>{equipment}</div>)}
                    <br />
                  </>
                )}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ my: 2, p: 2, mr: 1 }}>
              {selectedUser && (
                <FormControlLabel
                  control={<Switch checked={selectedUser.equipmentReady} onChange={() => handleToggleChange()} color="primary" />}
                  label="Equipment Ready to go?"
                />
              )}

              <div>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{
                    fontFamily: 'Nunito Sans, Arial, sans-serif',
                    fontWeight: 400,
                    color: 'rgb(98, 108, 114)',
                    fontSize: '14px',
                    lineHeight: '26px'
                  }}
                ></Typography>
                <FormControl fullWidth>
                  <InputLabel id="equipment-label">Add More Equipment?</InputLabel>
                  <br />
                  <Select labelId="equipment-label" id="equipment-select" value={selectedEquipment} onChange={handleEquipmentChange}>
                    <MenuItem value="">None</MenuItem>
                    {equipmentList.map((equipment) => (
                      <MenuItem key={equipment.id} value={equipment.name}>
                        {equipment.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ my: 2, p: 2, ml: 1 }}>
              <Box sx={{ my: 2, p: 2, ml: 1, height: expandValue, overflowY: expandValue === 100 ? 'hidden' : 'scroll' }}>
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
                  Who is on the Job?
                </Typography>

                {teamMembers &&
                  teamMembers.map((member, index) => (
                    <div key={index}>
                      {member.name}
                      <Switch checked={selectedMembers.includes(member.name)} onChange={() => handleMemberToggle(member.name)} />
                    </div>
                  ))}
              </Box>
              {expandValue === 100 ? (
                <Button onClick={expand} variant="contained" sx={{ mt: 0 }}>
                  Edit
                </Button>
              ) : (
                <Button onClick={() => setExpandValue(100)} variant="contained" sx={{ mt: 0 }}>
                  Done Editing
                </Button>
              )}
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
                Invoice Paid?
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
                <FormControlLabel control={<Switch checked={invoicePaid} onChange={handleInvoicePaid} color="primary" />} label="Paid?" />

                {invoicePaid ? (
                  <React.Fragment>
                    Yes
                    <CheckCircleIcon style={{ color: 'blue' }} />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    No
                    <DoNotDisturbIcon style={{ color: 'red' }} />
                  </React.Fragment>
                )}
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
