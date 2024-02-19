import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Paper from '@mui/material/Paper';
import { users } from '../../Util';

function RecentUsersList() {
  const [dateFilter, setDateFilter] = useState('all'); // State to track the selected date filter
  const [serviceFilter, setServiceFilter] = useState('all'); // State to track the selected serviceItem filter

  const handleDateChange = (event) => {
    setDateFilter(event.target.value);
  };

  const handleServiceChange = (event) => {
    setServiceFilter(event.target.value);
  };

  const isDateSoon = (dateString) => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const differenceInDays = Math.ceil((date - currentDate) / (1000 * 60 * 60 * 24));

    if (differenceInDays <= 0) {
      return 'red'; // Past date
    } else if (differenceInDays <= 3) {
      return '#d1f9ff'; // Within 3 days
    } else {
      return 'white'; // Default color
    }
  };
  const handleResetFilters = () => {
    setDateFilter('all');
    setServiceFilter('all');
  };

  const filterUsers = (user) => {
    const date = new Date(user.date);
    const currentDate = new Date();
    const differenceInDays = Math.ceil((date - currentDate) / (1000 * 60 * 60 * 24));

    const dateFilterCondition =
      dateFilter === 'past' ? differenceInDays <= 0 :
      dateFilter === 'soon' ? differenceInDays > 0 && differenceInDays <= 3 :
      true;

    const serviceFilterCondition = serviceFilter === 'all' ? true : user.serviceItem === serviceFilter;

    return dateFilterCondition && serviceFilterCondition;
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
        <InputLabel id="date-filter-label">Date Filter</InputLabel>
        <Select
          labelId="date-filter-label"
          id="date-filter"
          value={dateFilter}
          label="Date Filter"
          onChange={handleDateChange}
        >
          <MenuItem value="all">All Dates</MenuItem>
          <MenuItem value="past">Past Due & Today</MenuItem>
          <MenuItem value="soon">Within 3 Days</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
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
          <MenuItem value="Weekly">Weekly</MenuItem>
          <MenuItem value="Bi-Weekly">Bi-Weekly</MenuItem>
          <MenuItem value="Irrigation">Irrigation</MenuItem>
          
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleResetFilters} sx={{marginLeft:"30px"}}>Reset Filters</Button>

      <List>
        {users.filter(filterUsers).map((user, index) => (
          <Paper elevation={3} key={index} sx={{ my: 1, backgroundColor: isDateSoon(user.date) }}>
            <ListItem>
              <ListItemText sx={{ width: '20px'}}
                primary="Name" 
                secondary={`${user.firstName} ${user.lastName}`} 
              />
              <ListItemText 
                primary="Address" 
                secondary={`${user.address}`} 
              />
              <ListItemText
                primary="Service Item" 
                secondary={`${user.serviceItem}`} 
                style={{ margin: 0 }}
              />
              <ListItemText
                primary="Date" 
                secondary={user.date} 
                style={{ margin: 0 }}
              />
              <ListItemSecondaryAction>
                <Button color="secondary" variant="contained" style={{ marginRight: 8 }}>
                  Edit
                </Button>
                <Button color="error" variant="contained">
                  Delete
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
