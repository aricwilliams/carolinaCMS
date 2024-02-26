import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
  Box,
  Typography
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { users } from '../../Util'; // Assuming toolsByServiceItem contains data for landscaping tools by service item
import { EditBTNStyle } from '../../Util';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

function RecentUsersList() {
  const [dateFilter, setDateFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [frequencyFilter, setFrequencyFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user
  const [openModal, setOpenModal] = useState(false); // State to manage modal open/close
  const [EquipmentCheckedIn, setEquipmentCheckedIn] = useState(false);
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
      return '#f6f0fd'; // Past date
    } else if (differenceInDays <= 3) {
      return '#d1f9ff'; // Within 3 days
    } else {
      return 'white'; // Default color
    }
  };

  const handleResetFilters = () => {
    setDateFilter('all');
    setServiceFilter('all');
    setFrequencyFilter('all');
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

  return (
    <div>
      {/* Filter Controls */}
      <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
        <InputLabel id="date-filter-label">Date Filter</InputLabel>
        <Select labelId="date-filter-label" id="date-filter" value={dateFilter} label="Date Filter" onChange={handleDateChange}>
          <MenuItem value="all">All Dates</MenuItem>
          <MenuItem value="past">Past Due & Today</MenuItem>
          <MenuItem value="soon">Within 3 Days</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
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

      <FormControl sx={{ minWidth: 120 }}>
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

      <Button variant="contained" onClick={handleResetFilters} sx={{ marginLeft: '30px' }}>
        Reset Filters
      </Button>
      <Button variant="contained" sx={{ marginLeft: '30px' }}>
        + Add Job
      </Button>

      {/* User List */}
      <List>
        {users.filter(filterUsers)?.map((user, index) => (
          <Paper elevation={3} key={index} sx={{ my: 1, backgroundColor: isDateSoon(user.date) }}>
            <ListItem button onClick={() => handleOpenModal(user)}>
              {' '}
              {/* Open modal on user click */}
              <ListItemText sx={{ width: '20px' }} primary="Name" secondary={`${user.firstName} ${user.lastName}`} />
              <ListItemText sx={{ width: '20px' }} primary="Address" secondary={`${user.address}`} />
              <ListItemText sx={{ width: '20px' }} primary="Service Item" secondary={`${user.serviceItem}`} style={{ margin: 0 }} />
              <ListItemText sx={{ width: '20px' }} primary="Date" secondary={user.date} style={{ margin: 0 }} />
              {/* <ListItemText sx={{ width: '20px' }} primary="Frequency" secondary={user.serviceFrequency} style={{ margin: 0 }} /> */}
              <ListItemSecondaryAction>
                <Button color="secondary" variant="contained" style={EditBTNStyle} onClick={() => handleOpenModal(user)}>
                  Open
                </Button>
                <Button color="secondary" variant="contained" style={EditBTNStyle}>
                  Edit
                </Button>
              </ListItemSecondaryAction>
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
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          <Paper elevation={3} sx={{ my: 2, p: 2 }}>
            <Typography
              variant="h5" // You can adjust the variant to match the desired size and weight.
              component="h2"
              style={{
                fontFamily: 'Quicksand, Verdana, sans-serif',
                fontWeight: 700, // 700 is equivalent to 'bold'
                fontSize: '19px',
                lineHeight: '23px',
                color: 'black' // This is the RGB color provided.
              }}
            >
              {selectedUser && selectedUser.serviceItem} Details{' '}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {EquipmentCheckedIn ? (
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
                      color: 'red' // Change color to red
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
              {selectedUser && toolsByServiceItem[selectedUser.serviceItem]?.map((tool, index) => <div key={index}>{tool}</div>)}{' '}
            </Typography>
          </Paper>
        </Box>
      </Modal>
    </div>
  );
}

export default RecentUsersList;
