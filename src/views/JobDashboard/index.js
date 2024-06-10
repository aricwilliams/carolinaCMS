import React, { useState, useEffect, useRef } from 'react';

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
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function RecentUsersList() {
  const [dateFilter, setDateFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [frequencyFilter, setFrequencyFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user
  const [openModal, setOpenModal] = useState(false); // State to manage modal open/close
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [invoicePaid, setInvoicePaid] = useState(false);
  const [users, setUsers] = useState(usersServerData);
  // const teamMembers = JSON.parse(localStorage.getItem('team'));
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [expandValue, setExpandValue] = useState(100);
  const [userHasData, setUserHasData] = useState(false);
  const [customerAddress, setCustomerAddress] = useState('');
  const [jobNotes, setJobNotes] = useState('');
  const [tools, setTools] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [price, setPrice] = useState(2);
  const [curentUser, setCurentUser] = useState();
  const [showEquipment, setShowEquipment] = useState(['']);
  const [curentUserId, setCurentUserId] = useState();
  const [equipmentReadyToGo, setEquipmentReadyToGo] = useState(false);
  const isLessThan600 = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const [isButtonClicked, setIsButtonClicked] = useState(true);
  const isMounted = useRef(false);

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

  // const handleEquipmentChange = (event) => {
  //   setSelectedEquipment(event.target.value);
  // };
  const handleEquipmentChange = (event) => {
    const newEquipment = event.target.value;
    setSelectedEquipment((prevSelectedEquipment) => [...prevSelectedEquipment, newEquipment]);
  };

  const setEquipmentData = () => {
    addEquipmentDataCall(selectedEquipment);
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
  const handleEquipmentReadyToggleChange = () => {
    if (selectedUser) {
      setEquipmentReadyToGo(!equipmentReadyToGo);
      toggleEquipmentReadyDataCall();
      // setUsers((prevUsers) => {
      //   // Assuming users is an array of user objects
      //   return prevUsers.map((user) => {
      //     if (user.id === selectedUser.id) {
      //       return { ...user, equipmentReady: !selectedUser.equipmentReady };
      //     }
      //     return user;
      //   });
      // });
    }
  };

  const saveWhosOnJob = async () => {
    setExpandValue(100);
    const formatJobDate = (dateString) => {
      const date = new Date(dateString);
      // Adjusting the date format to 'YYYY-MM-DD HH:mm:ss'
      const formattedDate =
        date.getFullYear() +
        '-' +
        String(date.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(date.getDate()).padStart(2, '0') +
        ' ' +
        String(date.getHours()).padStart(2, '0') +
        ':' +
        String(date.getMinutes()).padStart(2, '0') +
        ':' +
        String(date.getSeconds()).padStart(2, '0');
      return formattedDate;
    };

    const dataCallObject = {
      JobTitle: curentUser.JobTitle,
      JobDescription: curentUser.JobDescription,
      EstimatedPrice: curentUser.EstimatedPrice,
      TruePrice: curentUser.TruePrice,
      CustomerName: curentUser.CustomerName,
      CustomerAddress: curentUser.CustomerAddress,
      Address: curentUser.Address,
      Equipment: curentUser.Equipment,
      EquipmentReadyToGo: curentUser.EquipmentReadyToGo,
      InvoicePaid: curentUser.InvoicePaid,
      WhosOnJob: selectedMembers,
      ServiceItems: curentUser.ServiceItems,
      JobNotes: curentUser.JobNotes,
      Frequencies: curentUser.Frequencies,
      JobDate: formatJobDate(curentUser.JobDate)
    };

    try {
      const response = await fetch(`http://localhost:3001/api/jobs/${curentUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataCallObject)
      });
      if (response.status === 200) {
        // Check if the response status is 200-299
        const result = await response.json();
        setResponse(result);
        toast.success(`Changes Saved`);
      } else {
        console.error('Failed to update the job:', response.statusText);
        toast.error(`Changes Not Saved`);
      }
    } catch (error) {
      // console.error('Error updating the job:', error);
      toast.success(`Changes Saved`);
    }
  };

  const addEquipmentDataCall = async (tool) => {
    const formatJobDate = (dateString) => {
      const date = new Date(dateString);
      // Adjusting the date format to 'YYYY-MM-DD HH:mm:ss'
      const formattedDate =
        date.getFullYear() +
        '-' +
        String(date.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(date.getDate()).padStart(2, '0') +
        ' ' +
        String(date.getHours()).padStart(2, '0') +
        ':' +
        String(date.getMinutes()).padStart(2, '0') +
        ':' +
        String(date.getSeconds()).padStart(2, '0');
      return formattedDate;
    };

    const dataCallObject = {
      JobTitle: curentUser.JobTitle,
      JobDescription: curentUser.JobDescription,
      EstimatedPrice: curentUser.EstimatedPrice,
      TruePrice: curentUser.TruePrice,
      CustomerName: curentUser.CustomerName,
      CustomerAddress: curentUser.CustomerAddress,
      Address: curentUser.Address,
      Equipment: tool.length <= 0 ? [tool] : tool,
      EquipmentReadyToGo: curentUser.EquipmentReadyToGo,
      InvoicePaid: curentUser.InvoicePaid,
      WhosOnJob: curentUser.WhosOnJob,
      ServiceItems: curentUser.ServiceItems,
      JobNotes: curentUser.JobNotes,
      Frequencies: curentUser.Frequencies,
      JobDate: formatJobDate(curentUser.JobDate)
    };

    try {
      const response = await fetch(`http://localhost:3001/api/jobs/${curentUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataCallObject)
      });
      if (response.status === 200) {
        // Check if the response status is 200-299
        const result = await response.json();
        setResponse(result);
        toast.success(`Changes Saved`);
      } else {
        console.error('Failed to update the job:', response.statusText);
        toast.error(`Changes Not Saved`);
      }
    } catch (error) {
      // console.error('Error updating the job:', error);
      toast.success(`Changes Saved`);
    }
  };

  const toggleEquipmentReadyDataCall = async () => {
    const formatJobDate = (dateString) => {
      const date = new Date(dateString);
      // Adjusting the date format to 'YYYY-MM-DD HH:mm:ss'
      const formattedDate =
        date.getFullYear() +
        '-' +
        String(date.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(date.getDate()).padStart(2, '0') +
        ' ' +
        String(date.getHours()).padStart(2, '0') +
        ':' +
        String(date.getMinutes()).padStart(2, '0') +
        ':' +
        String(date.getSeconds()).padStart(2, '0');
      return formattedDate;
    };

    const dataCallObject = {
      JobTitle: curentUser.JobTitle,
      JobDescription: curentUser.JobDescription,
      EstimatedPrice: curentUser.EstimatedPrice,
      TruePrice: curentUser.TruePrice,
      CustomerName: curentUser.CustomerName,
      CustomerAddress: curentUser.CustomerAddress,
      Address: curentUser.Address,
      Equipment: curentUser.Equipment,
      EquipmentReadyToGo: !equipmentReadyToGo,
      InvoicePaid: curentUser.InvoicePaid,
      WhosOnJob: curentUser.WhosOnJob,
      ServiceItems: curentUser.ServiceItems,
      JobNotes: curentUser.JobNotes,
      Frequencies: curentUser.Frequencies,
      JobDate: formatJobDate(curentUser.JobDate)
    };

    try {
      const response = await fetch(`http://localhost:3001/api/jobs/${curentUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataCallObject)
      });
      if (response.status === 200) {
        // Check if the response status is 200-299
        const result = await response.json();
        setResponse(result);
        toast.success(`Changes Saved`);
      } else {
        console.error('Failed to update the job:', response.statusText);
        toast.error(`Changes Not Saved`);
      }
    } catch (error) {
      // console.error('Error updating the job:', error);
      toast.success(`Changes Saved`);
    }
  };

  const toggleInvoicePaidDataCall = async () => {
    const formatJobDate = (dateString) => {
      const date = new Date(dateString);
      // Adjusting the date format to 'YYYY-MM-DD HH:mm:ss'
      const formattedDate =
        date.getFullYear() +
        '-' +
        String(date.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(date.getDate()).padStart(2, '0') +
        ' ' +
        String(date.getHours()).padStart(2, '0') +
        ':' +
        String(date.getMinutes()).padStart(2, '0') +
        ':' +
        String(date.getSeconds()).padStart(2, '0');
      return formattedDate;
    };

    const dataCallObject = {
      JobTitle: curentUser.JobTitle,
      JobDescription: curentUser.JobDescription,
      EstimatedPrice: curentUser.EstimatedPrice,
      TruePrice: curentUser.TruePrice,
      CustomerName: curentUser.CustomerName,
      CustomerAddress: curentUser.CustomerAddress,
      Address: curentUser.Address,
      Equipment: curentUser.Equipment,
      EquipmentReadyToGo: curentUser.EquipmentReadyToGo,
      InvoicePaid: !invoicePaid,
      WhosOnJob: curentUser.WhosOnJob,
      ServiceItems: curentUser.ServiceItems,
      JobNotes: curentUser.JobNotes,
      Frequencies: curentUser.Frequencies,
      JobDate: formatJobDate(curentUser.JobDate)
    };

    try {
      const response = await fetch(`http://localhost:3001/api/jobs/${curentUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataCallObject)
      });
      if (response.status === 200) {
        // Check if the response status is 200-299
        const result = await response.json();
        setResponse(result);
        toast.success(`Changes Saved`);
      } else {
        console.error('Failed to update the job:', response.statusText);
        toast.error(`Changes Not Saved`);
      }
    } catch (error) {
      // console.error('Error updating the job:', error);
      toast.success(`Changes Saved`);
    }
  };

  const handleInvoicePaid = (user) => {
    setInvoicePaid(user.InvoicePaid);
  };

  const handleInvoicePaidToggle = () => {
    setInvoicePaid(!invoicePaid);
    toggleInvoicePaidDataCall();
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

  const passdownUserData = (user) => {
    setEquipmentReadyToGo(user.EquipmentReadyToGo);
    setCustomerAddress(user.CustomerAddress);
    setJobNotes(user.JobNotes);
    setPrice(user.TruePrice);
    setCurentUser(user);
    setCurentUserId(user.Id);
    setShowEquipment(user.Equipment);
  };
  const handleOpenModal = (user) => {
    setUserHasData(false);

    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddress = () => {
    const address = { customerAddress };
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  };

  const handleMemberToggle = (memberName) => {
    setSelectedMembers((prevSelectedMembers) => {
      if (prevSelectedMembers.includes(memberName)) {
        // Remove member if already selected
        return prevSelectedMembers.filter((name) => name !== memberName);
      } else {
        // Add member if not selected
        return [...prevSelectedMembers, memberName];
      }
    });
  };

  const expand = () => {
    setExpandValue(300);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const handleMakeNewProjectNoData = () => {
    setIsButtonClicked(true);

    navigate('/ScheduleProject', { state: { runCode: true } });
  };
  const handleGoToNewJob = () => {
    navigate('/ScheduleProject', { state: { runCode: true } });
  };

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/jobs')
      .then((response) => {
        setUsers(response.data);
        setUserHasData(response.data.length === 0);
      })
      .catch((error) => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const fetchTools = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/tools');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTools(data);
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  const fetchCoWorkers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWorkers(data);
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      setEquipmentData();
    } else {
      isMounted.current = true;
    }
  }, [selectedEquipment]);

  return (
    <div>
      <Typography sx={{ display: isLessThan600 ? 'block' : 'none', textAlign: 'center', paddingBottom: '20px' }}>Job DashBoard</Typography>
      {userHasData ? (
        <Grid item xs={12} sm={1.4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 5 }}>
          <Stack direction="column">
            <Typography variant="h3" gutterBottom>
              You have no Jobs, Please add some Jobs!
            </Typography>
            <Box sx={{ my: 2 }}></Box>
            <Stack direction="row">
              <Button
                onClick={handleMakeNewProjectNoData}
                variant="outlined"
                sx={{
                  ml: '40%',
                  mb: 1,
                  animation: isButtonClicked ? 'myAnim 2s ease 0s infinite normal forwards' : 'none',
                  '@keyframes myAnim': {
                    '0%, 100%': {
                      transform: 'rotate(0deg)',
                      'transform-origin': '50% 100%'
                    },
                    '10%': {
                      transform: 'rotate(2deg)'
                    },
                    '20%, 40%, 60%': {
                      transform: 'rotate(-4deg)'
                    },
                    '30%, 50%, 70%': {
                      transform: 'rotate(4deg)'
                    },
                    '80%': {
                      transform: 'rotate(-2deg)'
                    },
                    '90%': {
                      transform: 'rotate(2deg)'
                    }
                  }
                }}
              >
                Add First Job
              </Button>
            </Stack>
          </Stack>
        </Grid>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FormControl sx={{ minWidth: isLessThan600 ? 320 : 120 }}>
                <InputLabel id="date-filter-label">Date Filter</InputLabel>
                <Select labelId="date-filter-label" id="date-filter" value={dateFilter} label="Date Filter" onChange={handleDateChange}>
                  <MenuItem value="all">All Dates</MenuItem>
                  <MenuItem value="past">Past Due & Today</MenuItem>
                  <MenuItem value="soon">Within 3 Days</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button variant="contained" onClick={handleGoToNewJob} sx={{ width: '100%' }}>
                + Add Job
              </Button>
            </Grid>
          </Grid>
          {/* User List */}
          <List>
            {users.filter(filterUsers)?.map((user, index) => (
              <Paper elevation={3} key={index} sx={{ my: 1, backgroundColor: isDateSoon(user.date) }}>
                <ListItem button sx={{ flexDirection: isLessThan600 ? 'column' : 'row' }}>
                  <ListItemText
                    sx={{ textAlign: 'center', paddingTop: isLessThan600 ? 1.5 : 0 }}
                    primary="Name"
                    secondary={`${user.JobTitle}`}
                  />
                  <ListItemText
                    sx={{ textAlign: 'center', paddingTop: isLessThan600 ? 1.5 : 0 }}
                    primary="Address"
                    secondary={`${user.Address}`}
                  />
                  <ListItemText
                    sx={{ textAlign: 'center', paddingTop: isLessThan600 ? 1.5 : 0 }}
                    primary="Service Items"
                    secondary={`${user.ServiceItems}`}
                    style={{ margin: 0 }}
                  />
                  <ListItemText
                    sx={{ textAlign: 'center', paddingBottom: isLessThan600 ? 1.5 : 0, paddingTop: isLessThan600 ? 1.5 : 0 }}
                    primary="Date"
                    secondary={formatDate(user.JobDate)}
                    style={{ margin: 0 }}
                  />{' '}
                  <Button
                    color="secondary"
                    variant="contained"
                    style={EditBTNStyle}
                    onClick={() => {
                      handleOpenModal(user);
                      passdownUserData(user);
                      handleInvoicePaid(user);
                      fetchTools();
                      fetchCoWorkers();
                    }}
                  >
                    Open
                  </Button>
                </ListItem>
              </Paper>
            ))}
          </List>
        </>
      )}

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
                  {equipmentReadyToGo ? (
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
                      {console.log(toolsByServiceItem)}{' '}
                      {showEquipment?.map((tool, index) => (
                        <div key={index}>
                          {tool}{' '}
                          {/* <Button sx={{ p: 0, m: 0 }}>
                            <HighlightOffIcon />
                          </Button> */}
                        </div>
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
                    control={<Switch checked={equipmentReadyToGo} onChange={() => handleEquipmentReadyToggleChange()} color="primary" />}
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
                      {tools.map((equipment) => (
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
                  {workers &&
                    workers.map((member, index) => (
                      <div key={index}>
                        {member.FirstName}
                        <Switch
                          checked={selectedMembers.includes(member.FirstName)}
                          onChange={() => handleMemberToggle(member.FirstName)}
                        />
                      </div>
                    ))}
                </Box>
                {expandValue === 100 ? (
                  <Button onClick={expand} variant="contained" sx={{ mt: 0 }}>
                    Edit
                  </Button>
                ) : (
                  <Button onClick={() => saveWhosOnJob()} variant="contained" sx={{ mt: 0 }}>
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
                  <FormControlLabel
                    control={<Switch checked={invoicePaid} onChange={handleInvoicePaidToggle} color="primary" />}
                    label="Paid?"
                  />

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
                  Invoice Amount
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
                  {price}
                </Typography>
                {invoicePaid ? (
                  <Button disabled variant="contained">
                    PAID
                  </Button>
                ) : (
                  <Button variant="contained">Send Invoice?</Button>
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
                  {jobNotes}
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
                  {customerAddress}{' '}
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
