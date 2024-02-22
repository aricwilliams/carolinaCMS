import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Paper from '@mui/material/Paper';
import { users } from '../../Util';
import { EditBTNStyle } from '../../Util';

function RecentUsersList() {
  const [dateFilter, setDateFilter] = useState('all'); // State to track the selected date filter
  const [serviceFilter, setServiceFilter] = useState('all'); // State to track the selected serviceItem filter
  const [frequencyFilter, setFrequencyFilter] = useState('all'); // State to track the selected service frequency filter

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

  return (
    <div>
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

      <List>
        {users.filter(filterUsers).map((user, index) => (
          <Paper elevation={3} key={index} sx={{ my: 1, backgroundColor: isDateSoon(user.date) }}>
            <ListItem>
              <ListItemText sx={{ width: '20px' }} primary="Name" secondary={`${user.firstName} ${user.lastName}`} />
              <ListItemText sx={{ width: '20px' }} primary="Address" secondary={`${user.address}`} />
              <ListItemText sx={{ width: '20px' }} primary="Service Item" secondary={`${user.serviceItem}`} style={{ margin: 0 }} />
              <ListItemText sx={{ width: '20px' }} primary="Date" secondary={user.date} style={{ margin: 0 }} />
              {/* <ListItemText sx={{ width: '20px' }} primary="Frequency" secondary={user.serviceFrequency} style={{ margin: 0 }} /> */}
              <ListItemSecondaryAction>
                <Button color="secondary" variant="contained" style={EditBTNStyle}>
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
    </div>
  );
}

export default RecentUsersList;
