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

import { useState } from 'react';
import Stack from '@mui/material/Stack';
export default function AddressForm() {
  const [editMode, setEditMode] = React.useState(false);
  const [editModeNew, setEditModeNew] = React.useState(false);
  const isLessThan600 = useMediaQuery('(max-width:600px)');

  const [customer, setCustomer] = React.useState('');
  const [newCustomer, setNewCustomer] = React.useState(false);
  const [showCustomer, setShowCustomer] = useState(false);

  const [tagValue, setTagValue] = useState('');
  const [tags, setTags] = useState([]);
  const handleChangeCustomer = (event) => {
    setCustomer(event.target.value);
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
    setEditMode(!editMode);
    if (editMode == true) {
      toast.success(`Changes Saved`);
    }
  };
  const toggleEditModeNew = () => {
    setEditModeNew(!editModeNew);
    if (editModeNew == false) {
      toast.success(`Changes Saved`);
    }
  };
  const NewCustomerFunc = () => {
    setCustomer('');
    setNewCustomer(true);
    setShowCustomer(false);
  };
  const handleTagChange = (event) => {
    setTagValue(event.target.value);
  };

  const handleTagSubmit = () => {
    if (tagValue.trim() !== '') {
      setTags([...tags, tagValue.trim()]);
      setTagValue('');
    }
  };

  const handleTagDelete = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const handleTagClick = (index) => {
    const editedTag = prompt('Edit Tag', tags[index]);
    if (editedTag !== null) {
      const updatedTags = [...tags];
      updatedTags[index] = editedTag.trim();
      setTags(updatedTags);
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
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Jan Mullock</MenuItem>
                  <MenuItem value={20}>Craig John</MenuItem>
                  <MenuItem value={30}>Faith Buller</MenuItem>
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
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              disabled={!editMode}
              defaultValue="Joann"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              disabled={!editMode}
              defaultValue="Kannelston"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="cell"
              name="cell"
              label="Phone"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              disabled={!editMode}
              defaultValue="(910)234-5543"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="work"
              name="work"
              label="Phone 2"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              disabled={!editMode}
              defaultValue="(910)234-5543"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="companyName"
              name="companyName"
              label="Company Name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              disabled={!editMode}
              defaultValue="N/A"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Tags are used for quick identification " arrow>
              <>
                <Stack direction={isLessThan600 ? 'column' : 'row'} spacing={1}>
                  {tags.map((tag, index) => (
                    <Box key={index}>
                      <Chip label={tag} variant="outlined" onDelete={() => handleTagDelete(index)} onClick={() => handleTagClick(index)} />
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
                  onChange={handleTagChange}
                  disabled={!editMode}
                  onKeyPress={handleKeyPress}
                />
                <Button sx={{ mt: 1 }} variant="contained" disabled={!editMode} onClick={handleTagSubmit}>
                  Submit
                </Button>
              </>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              defaultValue="923 Oak Street"
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
              autoComplete="shipping address-level2"
              variant="standard"
              defaultValue="Wilmington "
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
              defaultValue="NC"
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
              autoComplete="shipping postal-code"
              variant="standard"
              defaultValue="28401"
              disabled={!editMode}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={toggleEditMode}>
              {editMode ? 'Save' : 'Change'}
            </Button>
          </Grid>
        </Grid>
      )}
      {newCustomer && (
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <TextField required id="firstName" name="firstName" label="First name" fullWidth autoComplete="given-name" variant="standard" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required id="lastName" name="lastName" label="Last name" fullWidth autoComplete="family-name" variant="standard" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="cell" name="cell" label="Phone" fullWidth autoComplete="given-name" variant="standard" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="work" name="work" label="Phone 2" fullWidth autoComplete="family-name" variant="standard" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="companyName" name="companyName" label="Company Name" fullWidth autoComplete="family-name" variant="standard" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Tags are used for quick identification " arrow>
              <>
                <Stack direction={isLessThan600 ? 'column' : 'row'} spacing={1}>
                  {tags.map((tag, index) => (
                    <Box key={index}>
                      <Chip label={tag} variant="outlined" onDelete={() => handleTagDelete(index)} onClick={() => handleTagClick(index)} />
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
                  onChange={handleTagChange}
                  onKeyPress={handleKeyPress}
                />
                <Button variant="contained" onClick={handleTagSubmit}>
                  Submit
                </Button>
              </>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField required id="city" name="city" label="City" fullWidth autoComplete="shipping address-level2" variant="standard" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="state" name="state" label="State/Province/Region" fullWidth variant="standard" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={toggleEditModeNew}>
              {editModeNew ? 'Change' : 'Save'}
            </Button>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
