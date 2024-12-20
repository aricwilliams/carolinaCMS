import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import { FormControlLabel } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect } from 'react'; // React hooks for state and lifecycle management
import axios from 'axios'; // HTTP client for making API requests

import { useState } from 'react';
import Stack from '@mui/material/Stack';
export default function AddressForm() {
  const [editMode, setEditMode] = React.useState(false);
  const [editModeNew, setEditModeNew] = React.useState(false);
  const isLessThan600 = useMediaQuery('(max-width:600px)');

  const [customerExisting, setCustomerExisting] = useState(null); // State to store fetched customer data
  const [userHasData, setUserHasData] = useState(false); // State to handle whether the user has data or not

  const [customer, setCustomer] = React.useState('');
  const [newCustomer, setNewCustomer] = React.useState(false);
  const [showCustomer, setShowCustomer] = useState(false);

  const [tagValue, setTagValue] = useState('');
  // const [tags, setTags] = useState([]);
  const [chosenCustomer, setChosenCustomer] = useState([]);
  const [showSave, setShowSave] = useState(false);
  const handleChangeCustomer = (event) => {
    setCustomer(event.target.value);
    let ChosenCustomer = customerExisting.filter((customer) => customer.id === event.target.value);
    setChosenCustomer(ChosenCustomer);
  };
  console.log('userHasData', userHasData);

  const [newFormData, setNewFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    email: '',
    phone: '',
    phone2: '',
    companyName: '',
    tag: [], // Tags as an array
    city: '',
    state: '',
    zip: '',
    notes: '',
    billingSameAddress: true, // Convert to boolean
    invoices: '',
    activeJobs: 0,
    quotes: 0,
    scheduledJobs: 0,
    frequencies: '',
    status: 'Active',
    nextServiceDate: null, // Keep as date
    service: [],
    activeCustomer: true, // Convert to boolean
    created_at: null // Add created_at for timestamp
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    email: '',
    phone: '',
    phone2: '',
    companyName: '',
    tag: [], // Tags as an array
    city: '',
    state: '',
    zip: '',
    notes: '',
    billingSameAddress: true, // Convert to boolean
    invoices: '',
    activeJobs: 0,
    quotes: 0,
    scheduledJobs: 0,
    frequencies: '',
    status: 'Active',
    nextServiceDate: null, // Keep as date
    service: [],
    activeCustomer: true, // Convert to boolean
    created_at: null // Add created_at for timestamp
  });

  useEffect(() => {
    if (chosenCustomer.length > 0) {
      const customer = chosenCustomer[0];
      setFormData({
        id: customer.id || null,
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        address: customer.address || '',
        address2: customer.address2 || '',
        email: customer.email || '',
        phone: customer.phone || '',
        phone2: customer.phone2 || '',
        companyName: customer.companyName || '',
        tag: JSON.parse(customer.tag) || [], // Ensure it's an array
        city: customer.city || '',
        state: customer.state || '',
        zip: customer.zip || '',
        notes: customer.notes || '',
        billingSameAddress: customer.billingSameAddress === 1, // Convert 1/0 to boolean
        invoices: customer.invoices || '',
        activeJobs: customer.activeJobs || 0,
        quotes: customer.quotes || 0,
        scheduledJobs: customer.scheduledJobs || 0,
        frequencies: customer.frequencies || '',
        status: customer.status || 'Active',
        nextServiceDate: customer.nextServiceDate ? new Date(customer.nextServiceDate) : null, // Convert to Date object
        service: customer.service || [],
        activeCustomer: customer.activeCustomer === 1, // Convert 1/0 to boolean
        created_at: customer.created_at || null
      });
    }
  }, [chosenCustomer]);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const newHandleInputChange = (field) => (event) => {
    setNewFormData({
      ...newFormData,
      [field]: event.target.value
    });
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/customers');
        setCustomerExisting(response.data);
        setUserHasData(false);
      } catch (error) {
        setUserHasData(true);
        console.error('Error fetching the users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleShowToast = (message, type) => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    }
  };

  const handleSaveCustomer = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/customers/update/${chosenCustomer[0].id}`, formData);
      console.log('Customer updated:', response.data);

      handleShowToast('Customer updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating customer:', error);
      handleShowToast('Failed to update customer.', 'error');
    }
  };

  const handleShowCheckboxCustomer = (event) => {
    if (customer) {
      setCustomer('');
    }
    if (newCustomer === true) {
      setNewCustomer(false);
    }
    setShowCustomer(event.target.checked);
  };

  const toggleEditMode = () => {
    setShowSave(true);
    setEditMode(!editMode);
  };
  const toggleEditModeNew = () => {
    setEditModeNew(!editModeNew);
  };

  const saveUpdateCustomerInfo = () => {
    handleSaveCustomer();
  };

  const NewCustomerFunc = () => {
    setCustomer('');
    setNewCustomer(true);
    setShowCustomer(false);
  };

  ///////////////

  const handleTagChange = (event) => {
    setTagValue(event.target.value);
  };

  const handleTagSubmit = () => {
    if (tagValue.trim() !== '') {
      const updatedTags = [...formData.tag, tagValue.trim()];
      setFormData({ ...formData, tag: updatedTags }); // Add new tag to formData
      setTagValue(''); // Reset the input field
      event.preventDefault();
    }
  };

  const handleTagDelete = (index) => {
    const updatedTags = [...formData.tag];
    updatedTags.splice(index, 1); // Remove tag at the specified index
    setFormData({ ...formData, tag: updatedTags }); // Update formData
  };

  const handleTagClick = (index) => {
    const editedTag = prompt('Edit Tag', formData.tag[index]);
    if (editedTag !== null) {
      const updatedTags = [...formData.tag];
      updatedTags[index] = editedTag.trim(); // Update tag at the index
      setFormData({ ...formData, tag: updatedTags }); // Update formData
    }
  };

  const newhandleTagSubmit = () => {
    if (tagValue.trim() !== '') {
      const updatedTags = [...newFormData.tag, tagValue.trim()];
      setNewFormData({ ...newFormData, tag: updatedTags }); // Add new tag to formData
      setTagValue(''); // Reset the input field
      event.preventDefault();
    }
  };

  const newhandleTagDelete = (index) => {
    const updatedTags = [...newFormData.tag];
    updatedTags.splice(index, 1); // Remove tag at the specified index
    setNewFormData({ ...newFormData, tag: updatedTags }); // Update formData
  };

  const newhandleTagClick = (index) => {
    const editedTag = prompt('Edit Tag', newFormData.tag[index]);
    if (editedTag !== null) {
      const updatedTags = [...newFormData.tag];
      updatedTags[index] = editedTag.trim(); // Update tag at the index
      setNewFormData({ ...newFormData, tag: updatedTags }); // Update formData
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleTagSubmit();
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Customer Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Stack>
            <FormControlLabel control={<Checkbox onChange={handleShowCheckboxCustomer} />} label="Existing Customer?" />
            {showCustomer && (
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Choose Customer</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={customer}
                  onChange={handleChangeCustomer}
                  label="Age"
                >
                  {customerExisting.map((customerData) => (
                    <MenuItem key={customerData.id} value={customerData.id}>
                      {customerData.firstName + ' ' + customerData.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button onClick={NewCustomerFunc} variant="contained">
            New Customer?
          </Button>
        </Grid>
      </Grid>

      {customer && (
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              variant="standard"
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phone"
              name="phone"
              label="Phone"
              fullWidth
              variant="standard"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phone2"
              name="phone2"
              label="Phone 2"
              fullWidth
              variant="standard"
              value={formData.phone2}
              onChange={handleInputChange('phone2')}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="companyName"
              name="companyName"
              label="Company Name"
              fullWidth
              variant="standard"
              value={formData.companyName}
              onChange={handleInputChange('companyName')}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              name="email"
              label="Email"
              fullWidth
              variant="standard"
              value={formData.email}
              onChange={handleInputChange('email')}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              variant="standard"
              value={formData.address}
              onChange={handleInputChange('address')}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              variant="standard"
              value={formData.city}
              onChange={handleInputChange('city')}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              value={formData.state}
              onChange={handleInputChange('state')}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              variant="standard"
              value={formData.zip}
              onChange={handleInputChange('zip')}
              disabled={!editMode}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Tooltip title="Tags are used for quick identification " arrow>
              <>
                <Stack direction={isLessThan600 ? 'column' : 'row'} spacing={1}>
                  {formData.tag?.map((tag, index) => (
                    <Box key={index}>
                      <Chip
                        label={tag}
                        variant="outlined"
                        onDelete={editMode ? () => handleTagDelete(index) : undefined}
                        onClick={editMode ? () => handleTagClick(index) : undefined}
                        disabled={!editMode}
                        style={{
                          pointerEvents: editMode ? 'auto' : 'none', // Prevent interaction when disabled
                          opacity: editMode ? 1 : 0.5 // Grayed out appearance
                        }}
                      />
                    </Box>
                  ))}
                </Stack>

                <TextField
                  id="tag"
                  name="tag"
                  label="Tag"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={tagValue}
                  disabled={!editMode}
                  onChange={handleTagChange}
                  onKeyPress={handleKeyPress}
                />
                <Button sx={{ mt: 1 }} variant="contained" disabled={!editMode} onClick={handleTagSubmit}>
                  Submit
                </Button>
              </>
            </Tooltip>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={toggleEditMode}>
              Change
            </Button>
          </Grid>
          <Grid item xs={12}>
            {showSave ? (
              <Button variant="contained" onClick={saveUpdateCustomerInfo}>
                Save
              </Button>
            ) : (
              ' '
            )}
          </Grid>
        </Grid>
      )}
      {newCustomer && (
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={newFormData.firstName}
              onChange={newHandleInputChange('firstName')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              variant="standard"
              value={newFormData.lastName}
              onChange={newHandleInputChange('lastName')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phone"
              name="phone"
              label="Phone"
              fullWidth
              variant="standard"
              value={newFormData.phone}
              onChange={newHandleInputChange('phone')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phone2"
              name="phone2"
              label="Phone 2"
              fullWidth
              variant="standard"
              value={newFormData.phone2}
              onChange={newHandleInputChange('phone2')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="companyName"
              name="companyName"
              label="Company Name"
              fullWidth
              variant="standard"
              value={newFormData.companyName}
              onChange={newHandleInputChange('companyName')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              name="email"
              label="Email"
              fullWidth
              variant="standard"
              value={newFormData.email}
              onChange={newHandleInputChange('email')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              variant="standard"
              value={newFormData.address}
              onChange={newHandleInputChange('address')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              variant="standard"
              value={newFormData.city}
              onChange={newHandleInputChange('city')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              value={newFormData.state}
              onChange={newHandleInputChange('state')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              variant="standard"
              value={newFormData.zip}
              onChange={newHandleInputChange('zip')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Tooltip title="Tags are used for quick identification " arrow>
              <>
                <Stack direction={isLessThan600 ? 'column' : 'row'} spacing={1}>
                  {formData.tag?.map((tag, index) => (
                    <Box key={index}>
                      <Chip
                        label={tag}
                        variant="outlined"
                        onDelete={editMode ? () => newhandleTagDelete(index) : undefined}
                        onClick={editMode ? () => newhandleTagClick(index) : undefined}
                        disabled={!editMode}
                        style={{
                          pointerEvents: editMode ? 'auto' : 'none', // Prevent interaction when disabled
                          opacity: editMode ? 1 : 0.5 // Grayed out appearance
                        }}
                      />
                    </Box>
                  ))}
                </Stack>

                <TextField
                  id="tag"
                  name="tag"
                  label="Tag"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={tagValue}
                  disabled={!editMode}
                  onChange={handleTagChange}
                  onKeyPress={handleKeyPress}
                />
                <Button sx={{ mt: 1 }} variant="contained" disabled={!editMode} onClick={newhandleTagSubmit}>
                  Submit
                </Button>
              </>
            </Tooltip>
          </Grid>

          <Grid item xs={12}>
            {editModeNew ? (
              <Button variant="contained" onClick={toggleEditModeNew}>
                Change
              </Button>
            ) : (
              <Button variant="contained" onClick={saveUpdateCustomerInfo}>
                Save
              </Button>
            )}
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
