import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Paper from '@mui/material/Paper';
import { usersServerData } from '../../Util'; // Assuming toolsByServiceItem contains data for landscaping tools by service item
import { EditBTNStyle } from '../../Util';
import { teamState } from '../../atom';
import { useRecoilState } from 'recoil';
import CustomerModalContent from './CustomerModal';
import CustomerDetailsModal from './CustomerDetailsModal';
import { equipmentList } from '../../EquipmentUtil';

// useSetRecoilState
function RecentUsersList() {
  const [dateFilter, setDateFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [frequencyFilter, setFrequencyFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user
  const [openModal, setOpenModal] = useState(false); // State to manage modal open/close
  const [openCustomerModal, setOpenCustomerModal] = useState(false); // State to manage modal open/close
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [invoicePaid, setInvoicePaid] = useState(false);
  const [users, setUsers] = useState(usersServerData);
  const [teamMembers2] = useRecoilState(teamState);
  console.log(teamMembers2);
  const teamMembers = JSON.parse(localStorage.getItem('team'));
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [expandValue, setExpandValue] = useState(100);

  // setTeamMembers

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

  const isFreeWork = (InvoiceStatus, ActiveWork, ScheduledWork) => {
    if (InvoiceStatus == 'Unpaid' && ActiveWork > 0) {
      return '#EF7A7A'; // Past date
    } else if (InvoiceStatus == 'Unpaid' && ScheduledWork > 0) {
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

  const handleInvoicePaid = (event) => {
    setInvoicePaid(event.target.checked);

    // Perform any other actions here when the toggle is toggled
  };
  const filterUsers = (user) => {
    if (dateFilter === 'Paid') {
      return user.invoices === 'Paid';
    } else if (dateFilter === 'Unpaid') {
      return user.invoices === 'Unpaid';
    } else {
      return true; // Show all users if no filter applied
    }
  };
  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenCustomerModal = (user) => {
    setSelectedUser(user);
    setOpenCustomerModal(true);
  };

  const handleCloseCustomerModal = () => {
    setOpenCustomerModal(false);
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
  return (
    <div>
      {/* Filter Controls */}
      <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
        <InputLabel id="date-filter-label">Invoices</InputLabel>
        <Select labelId="date-filter-label" id="date-filter" value={dateFilter} label="Invoice Filter" onChange={handleDateChange}>
          <MenuItem value="Unpaid">Unpaid</MenuItem>
          <MenuItem value="Paid">Paid</MenuItem>
          <MenuItem value="all">None</MenuItem>
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
      <Button variant="contained" onClick={handleOpenCustomerModal} sx={{ marginLeft: '30px' }}>
        + Add New Customer
      </Button>

      {/* User List */}
      <List>
        {users.filter(filterUsers)?.map((user, index) => (
          <Paper elevation={3} key={index} sx={{ my: 1, backgroundColor: isFreeWork(user.invoices, user.activeJobs, user.jobs) }}>
            <ListItem button onClick={() => handleOpenModal(user)}>
              {' '}
              {/* Open modal on user click */}
              <ListItemText sx={{ width: '20px' }} primary="Name" secondary={`${user.firstName} ${user.lastName}`} />
              <ListItemText sx={{ width: '20px' }} primary="Phone Number" secondary={user.phoneNumber} style={{ margin: 0 }} />
              <ListItemText sx={{ width: '20px' }} primary="Invoices" secondary={user.invoices} style={{ margin: 0 }} />
              <ListItemText sx={{ width: '20px' }} primary="Active Jobs" secondary={`${user.activeJobs}`} />
              {/* <ListItemText sx={{ width: '20px' }} primary="Requests" secondary={`${user.requests}`} style={{ margin: 0 }} /> */}
              <ListItemText sx={{ width: '20px' }} primary="Quotes" secondary={user.quotes} style={{ margin: 0 }} />
              <ListItemText sx={{ width: '20px' }} primary="Scheduled Jobs" secondary={user.jobs} style={{ margin: 0 }} />
              {/* <ListItemText sx={{ width: '20px' }} primary="Frequency" secondary={user.serviceFrequency} style={{ margin: 0 }} /> */}
              <ListItemSecondaryAction>
                {/* <Button color="secondary" variant="contained" style={EditBTNStyle} onClick={() => handleOpenModal(user)}>
                  Open
                </Button> */}
                <Button color="secondary" variant="contained" style={EditBTNStyle}>
                  Open
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        ))}
      </List>

      <CustomerDetailsModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        selectedUser={selectedUser}
        selectedEquipment={selectedEquipment}
        toolsByServiceItem={toolsByServiceItem}
        equipmentList={equipmentList}
        teamMembers={teamMembers}
        selectedMembers={selectedMembers}
        expandValue={expandValue}
        handleToggleChange={handleToggleChange}
        handleEquipmentChange={handleEquipmentChange}
        handleMemberToggle={handleMemberToggle}
        handleInvoicePaid={handleInvoicePaid}
        handleAddress={handleAddress}
        location={location}
        invoicePaid={invoicePaid}
        expand={expand}
      />
      <CustomerModalContent handleCloseCustomerModal={handleCloseCustomerModal} openCustomerModal={openCustomerModal} />
    </div>
  );
}

export default RecentUsersList;
