import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Select, MenuItem, FormControl, InputLabel, useMediaQuery, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { EditBTNStyle } from '../../Util';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomerModalContent from './CustomerModal';
import CustomerDetailsModal from './CustomerDetailsModal';
import { equipmentList } from '../../EquipmentUtil';
import { useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RecentUsersList() {
  const [dateFilter, setDateFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [frequencyFilter, setFrequencyFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user
  const [openModal, setOpenModal] = useState(false); // State to manage modal open/close
  const [openCustomerModal, setOpenCustomerModal] = useState(false); // State to manage modal open/close
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [invoicePaid, setInvoicePaid] = useState(false);
  const [users, setUsers] = useState([]);
  const teamMembers = JSON.parse(localStorage.getItem('team'));
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [expandValue, setExpandValue] = useState(100);
  const isLessThan600 = useMediaQuery('(max-width:600px)');
  const [userHasData, setUserHasData] = useState(false);
  const location = useLocation();
  const [isButtonClicked, setIsButtonClicked] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/listings/customers');
        setUsers(response.data);
        setUserHasData(false);
      } catch (error) {
        setUserHasData(true);
        console.error('Error fetching the users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (location.state && location.state.runCode) {
      // Code to execute when component mounts after button click
      setOpenCustomerModal(true); // Your other code here
    }
  }, [location.state]);

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
    console.log('targett', event.target.value);
    setFrequencyFilter(event.target.value);
  };

  const isFreeWork = (InvoiceStatus, ActiveWork, ScheduledWork) => {
    if (InvoiceStatus == 'Unpaid' && ActiveWork > 0) {
      return 'white'; // Past date
    } else if (InvoiceStatus == 'Unpaid' && ScheduledWork > 0) {
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
  // const filterUsers = (user) => {
  //   if (dateFilter === 'Paid') {
  //     return user.invoices === 'Paid';
  //   } else if (dateFilter === 'Unpaid') {
  //     return user.invoices === 'Unpaid';
  //   } else {
  //     return true; // Show all users if no filter applied
  //   }
  // };

  const filterUsers = (user) => {
    let dateFilterCondition;

    if (dateFilter === 'Paid') {
      dateFilterCondition = user.invoices === 'paid';
    } else if (dateFilter === 'unpaid') {
      dateFilterCondition = user.invoices === 'unpaid';
    } else {
      dateFilterCondition = true; // Show all users if no filter applied
    }
    const frequencyFilterCondition = frequencyFilter === 'all' ? true : user.frequencies === frequencyFilter;

    return dateFilterCondition && frequencyFilterCondition;
  };

  const handleNavigateToInvoice = (invoice) => {
    console.log(invoice);
    navigate('/invoice');
  };
  const handleNavigateToActiveJobs = (invoice) => {
    console.log(invoice);
    navigate('/JobDashboard');
  };
  const handleNavigateToScheduleJobs = (invoice) => {
    console.log(invoice);
    navigate('/JobDashboard');
  };
  const handleNavigateToQuotes = (invoice) => {
    console.log(invoice);
    navigate('/JobDashboard');
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
  let noShow = true;

  const handleMakeNewCustomerNoData = () => {
    setIsButtonClicked(true);

    navigate('/CustomerDashboard', { state: { runCode: true } });
  };

  const handleShowToast = (message, type) => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    }
  };
  return (
    <div>
      {userHasData ? (
        <Grid item xs={12} sm={1.4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 5 }}>
          <Stack direction="column">
            <Typography variant="h3" gutterBottom>
              You have no Customers, Please add some customers!
            </Typography>
            <Box sx={{ my: 2 }}></Box>
            <Stack direction="row">
              <Button
                onClick={handleMakeNewCustomerNoData}
                variant="outlined"
                sx={{
                  ml: '40%',
                  mb: 1,
                  animation: isButtonClicked ? 'bounce 1s infinite' : 'none',
                  '@keyframes bounce': {
                    '0%, 20%, 50%, 80%, 100%': {
                      transform: 'translateY(0)'
                    },
                    '40%': {
                      transform: 'translateY(-10px)'
                    },
                    '60%': {
                      transform: 'translateY(-5px)'
                    }
                  }
                }}
              >
                Add First Customer
              </Button>
            </Stack>
          </Stack>
        </Grid>
      ) : (
        <>
          <Typography sx={{ display: isLessThan600 ? 'block' : 'none', textAlign: 'center', paddingBottom: '20px' }}>
            Customer DashBoard
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={1} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FormControl sx={{ minWidth: isLessThan600 ? 320 : 120 }}>
                <InputLabel id="date-filter-label">Invoices</InputLabel>
                <Select labelId="date-filter-label" id="date-filter" value={dateFilter} label="Invoice Filter" onChange={handleDateChange}>
                  <MenuItem value="unpaid">Outstanding Invoice Not Paid</MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="all">None</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {isLessThan600 ? null : noShow ? null : (
              <Grid item xs={12} sm={1.5} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            )}

            <Grid item xs={12} sm={1.3} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button variant="contained" onClick={handleResetFilters} sx={{ width: '100%' }}>
                Reset Filters
              </Button>
            </Grid>
            <Grid item xs={12} sm={2.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button variant="contained" onClick={handleOpenCustomerModal} sx={{ width: '100%' }}>
                + Add New Customer
              </Button>
            </Grid>
          </Grid>
          <List>
            {users.filter(filterUsers)?.map((user, index) => (
              <Paper elevation={3} key={index} sx={{ my: 1, backgroundColor: isFreeWork(user.invoices, user.activeJobs, user.jobs) }}>
                <ListItem sx={{ flexDirection: isLessThan600 ? 'column' : 'row' }}>
                  <ListItemText
                    primary={<Typography sx={{ textAlign: 'center' }}>Name</Typography>}
                    secondary={
                      <Typography sx={{ textAlign: 'center' }}>
                        {user.firstName} {user.lastName}
                      </Typography>
                    }
                    sx={{ textAlign: 'center', width: '16.6%' }}
                  />
                  <ListItemText
                    primary={<Typography sx={{ textAlign: 'center' }}>Phone Number</Typography>}
                    secondary={
                      <Typography
                        sx={{ textAlign: 'center' }}
                        // onClick={() => handleNavigateTo('phoneNumber')}
                      >
                        {user.phone}
                      </Typography>
                    }
                    sx={{ textAlign: 'center' }}
                  />
                  <ListItemText
                    primary={<Typography sx={{ textAlign: 'center' }}>Invoices</Typography>}
                    secondary={
                      <Typography
                        sx={{
                          textAlign: 'center',
                          color: 'blue',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          padding: '0',
                          margin: '0'
                        }}
                        variant="body1"
                        onClick={() => handleNavigateToInvoice('2')}
                      >
                        {user.invoices}
                      </Typography>
                    }
                  />
                  <ListItemText
                    primary={<Typography sx={{ textAlign: 'center' }}>Active Jobs</Typography>}
                    secondary={
                      <Typography
                        sx={{ textAlign: 'center', cursor: 'pointer', color: 'blue' }}
                        onClick={() => handleNavigateToActiveJobs('activeJobs')}
                      >
                        {user.activeJobs}
                      </Typography>
                    }
                    sx={{ textAlign: 'center' }}
                  />
                  <ListItemText
                    primary={<Typography sx={{ textAlign: 'center' }}>Quotes</Typography>}
                    secondary={
                      <Typography
                        sx={{ textAlign: 'center', cursor: 'pointer', color: 'blue' }}
                        onClick={() => handleNavigateToQuotes('quotes')}
                      >
                        {user.quotes}
                      </Typography>
                    }
                    sx={{ textAlign: 'center' }}
                  />
                  <ListItemText
                    primary={<Typography sx={{ textAlign: 'center' }}>Scheduled Jobs</Typography>}
                    secondary={
                      <Typography
                        sx={{ textAlign: 'center', cursor: 'pointer', color: 'blue' }}
                        onClick={() => handleNavigateToScheduleJobs('scheduledJobs')}
                      >
                        {user.scheduledJobs}
                      </Typography>
                    }
                    sx={{ textAlign: 'center' }}
                  />

                  <Button color="secondary" variant="contained" onClick={() => handleOpenModal(user)} style={EditBTNStyle}>
                    Open
                  </Button>
                </ListItem>
              </Paper>
            ))}
          </List>
        </>
      )}
      {/* User List */}
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
        showToast={handleShowToast}
      />
      <CustomerModalContent
        handleCloseCustomerModal={handleCloseCustomerModal}
        openCustomerModal={openCustomerModal}
        showToast={handleShowToast}
      />
    </div>
  );
}

export default RecentUsersList;
