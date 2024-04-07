import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
  Box,
  Typography,
  Grid,
  useMediaQuery
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { usersServerData } from '../../Util'; // Assuming toolsByServiceItem contains data for landscaping tools by service item
import { EditBTNStyle } from '../../Util';
// import { teamState } from '../../atom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
// import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import { useRecoilState } from 'recoil';
import CloseIcon from '@mui/icons-material/Close';
// useSetRecoilState
function RecentUsersList() {
  const [dateFilter, setDateFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [frequencyFilter, setFrequencyFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user
  const [openModal, setOpenModal] = useState(false); // State to manage modal open/close
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [invoicePaid, setInvoicePaid] = useState(false);
  const [users, setUsers] = useState(usersServerData);
  const teamMembers = JSON.parse(localStorage.getItem('team'));
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [expandValue, setExpandValue] = useState(100);
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
  // setTeamMembers

  const equipmentList = [
    { id: 1, name: 'Lawn Mower' },
    { id: 2, name: 'Hedge Trimmer' },
    { id: 3, name: 'Leaf Blower' },
    { id: 4, name: 'String Trimmer (Weed Eater)' },
    { id: 5, name: 'Chainsaw' },
    { id: 6, name: 'Garden Shears' },
    { id: 7, name: 'Pruning Saw' },
    { id: 8, name: 'Rakes (Leaf, Garden, Lawn)' },
    { id: 9, name: 'Shovels (Round, Square, Digging)' },
    { id: 10, name: 'Wheelbarrow' },
    { id: 11, name: 'Garden Hoe' },
    { id: 12, name: 'Trowel' },
    { id: 13, name: 'Mattock' },
    { id: 14, name: 'Loppers' },
    { id: 15, name: 'Cultivator' },
    { id: 16, name: 'Sprinklers' },
    { id: 17, name: 'Garden Fork' },
    { id: 18, name: 'Mulching Lawn Mower' },
    { id: 19, name: 'Garden Cart' },
    { id: 20, name: 'Edger' },
    { id: 21, name: 'Tiller' },
    { id: 22, name: 'Watering Can' },
    { id: 23, name: 'Leaf Vacuum' },
    { id: 24, name: 'Pressure Washer' },
    { id: 25, name: 'Garden Gloves' },
    { id: 26, name: 'Kneeling Pad' },
    { id: 27, name: 'Garden Sprayer' },
    { id: 28, name: 'Soil pH Tester' },
    { id: 29, name: 'Wheel Edger' },
    { id: 30, name: 'Manual Lawn Aerator' }
    // Add more equipment items as needed
  ];

  // const handleEquipmentChange = (event) => {
  //   setSelectedEquipment(event.target.value);
  // };
  const handleEquipmentChange = (event) => {
    const newEquipment = event.target.value;
    setSelectedEquipment((prevSelectedEquipment) => [...prevSelectedEquipment, newEquipment]);
  };

  const toolsByServiceItem = {
    Multch: ['Lawnmower', 'Rake', 'Shovel', 'Wheelbarrow'],
    Sod: ['Turf Cutter', 'Spade', 'Trowel', 'Lawn Roller'],
    BasicPackage: ['Lawnmower', 'Hedge Trimmer', 'Leaf Blower', 'Pruning Shears'],
    Irrigation: ['Trencher', 'Pipe Cutter', 'Sprinkler Heads', 'Valves'],
    None: [] // No tools needed for prospect users
  };

  const handleDateChange = (event) => {
    setDateFilter(event.target.value);
  };

  const handleServiceChange = (event) => {
    setServiceFilter(event.target.value);
  };

  const handleFrequencyChange = (event) => {
    setFrequencyFilter(event.target.value);
  };

  const isDateSoon = (dateString) => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const differenceInDays = Math.ceil((date - currentDate) / (1000 * 60 * 60 * 24));

    if (differenceInDays <= 0) {
      return 'white'; // Past date
    } else if (differenceInDays <= 3) {
      return 'white'; // Within 3 days
    } else {
      return 'white'; // Default color
    }
  };

  const handleResetFilters = () => {
    setDateFilter('all');
    setServiceFilter('all');
    setFrequencyFilter('all');
  };

  // const handleToggleChange = (event) => {
  //   setEquipmentCheckedIn(event.target.checked);
  // };
  const handleToggleChange = () => {
    if (selectedUser) {
      // Ensure selectedUser is not null
      setSelectedUser((prevUser) => ({
        ...prevUser,
        equipmentReady: !prevUser.equipmentReady // Toggle the value of equipmentReady
      }));
      setUsers((prevUsers) => {
        // Assuming users is an array of user objects
        return prevUsers.map((user) => {
          if (user.id === selectedUser.id) {
            return { ...user, equipmentReady: !selectedUser.equipmentReady };
          }
          return user;
        });
      });
    }
  };
  // const handleToggleChange = () => {
  //   selectedUser.equipmentReady = !selectedUser.equipmentReady;
  //   console.log(selectedUser);
  // };

  const handleInvoicePaid = (event) => {
    setInvoicePaid(event.target.checked);

    // Perform any other actions here when the toggle is toggled
  };
  const filterUsers = (user) => {
    const date = new Date(user.date);
    const currentDate = new Date();
    const differenceInDays = Math.ceil((date - currentDate) / (1000 * 60 * 60 * 24));

    const dateFilterCondition =
      dateFilter === 'past' ? differenceInDays <= 0 : dateFilter === 'soon' ? differenceInDays > 0 && differenceInDays <= 3 : true;

    const serviceFilterCondition = serviceFilter === 'all' ? true : user.serviceItem === serviceFilter;

    const frequencyFilterCondition = frequencyFilter === 'all' ? true : user.serviceFrequency === frequencyFilter;

    return dateFilterCondition && serviceFilterCondition && frequencyFilterCondition;
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddress = () => {
    const address = '6537 castlebrook way shallotte nc'; // specify the address here
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  };

  const handleMemberToggle = (memberName) => {
    if (selectedMembers.includes(memberName)) {
      setSelectedMembers(selectedMembers.filter((name) => name !== memberName));
    } else {
      setSelectedMembers([...selectedMembers, memberName]);
    }
  };

  const expand = () => {
    setExpandValue(300);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FormControl sx={{ minWidth: isLessThan600 ? 320 : 120 }}>
            <InputLabel id="date-filter-label">Date Filter</InputLabel>
            <Select labelId="date-filter-label" id="date-filter" value={dateFilter} label="Date Filter" onChange={handleDateChange}>
              <MenuItem value="all">All Dates</MenuItem>
              <MenuItem value="past">Past Due & Today</MenuItem>
              <MenuItem value="soon">Within 3 Days</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={1.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FormControl sx={{ minWidth: isLessThan600 ? 320 : 170 }}>
            <InputLabel id="service-filter-label">Service Item Filter</InputLabel>
            <Select
              labelId="service-filter-label"
              id="service-filter"
              value={serviceFilter}
              label="Service Item Filter"
              onChange={handleServiceChange}
            >
              <MenuItem value="all">All Service Items</MenuItem>
              <MenuItem value="Multch">Multch</MenuItem>
              <MenuItem value="Sod">Sod</MenuItem>
              <MenuItem value="BasicPackage">Basic Package</MenuItem>
              <MenuItem value="Irrigation">Irrigation</MenuItem>
              <MenuItem value="None">None (Prospect)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={1.3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FormControl sx={{ minWidth: isLessThan600 ? 320 : 150 }}>
            <InputLabel id="frequency-filter-label">Service Frequency Filter</InputLabel>
            <Select
              labelId="frequency-filter-label"
              id="frequency-filter"
              value={frequencyFilter}
              label="Service Frequency Filter"
              onChange={handleFrequencyChange}
            >
              <MenuItem value="all">All Frequencies</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="biweekly">Bi-Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleResetFilters} sx={{ width: '100%' }}>
            Reset Filters
          </Button>
        </Grid>
        <Grid item xs={12} sm={1.4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button variant="contained" sx={{ width: '100%' }}>
            + Add Job
          </Button>
        </Grid>
      </Grid>
      {/* User List */}
      <List>
        {users.filter(filterUsers)?.map((user, index) => (
          <Paper elevation={3} key={index} sx={{ my: 1, backgroundColor: isDateSoon(user.date) }}>
            <ListItem button onClick={() => handleOpenModal(user)} sx={{ flexDirection: isLessThan600 ? 'column' : 'row' }}>
              <ListItemText
                sx={{ textAlign: 'center', paddingTop: isLessThan600 ? 1.5 : 0 }}
                primary="Name"
                secondary={`${user.firstName} ${user.lastName}`}
              />
              <ListItemText
                sx={{ textAlign: 'center', paddingTop: isLessThan600 ? 1.5 : 0 }}
                primary="Address"
                secondary={`${user.address}`}
              />
              <ListItemText
                sx={{ textAlign: 'center', paddingTop: isLessThan600 ? 1.5 : 0 }}
                primary="Service Item"
                secondary={`${user.serviceItem}`}
                style={{ margin: 0 }}
              />
              <ListItemText
                sx={{ textAlign: 'center', paddingBottom: isLessThan600 ? 1.5 : 0, paddingTop: isLessThan600 ? 1.5 : 0 }}
                primary="Date"
                secondary={formatDate(user.date)}
                style={{ margin: 0 }}
              />{' '}
              <Button color="secondary" variant="contained" style={EditBTNStyle} onClick={() => handleOpenModal(user)}>
                Open
              </Button>
            </ListItem>
          </Paper>
        ))}
      </List>

      {/* Modal */}
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

                <Button variant="contained">Send Invoice?</Button>
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
    </div>
  );
}

export default RecentUsersList;
