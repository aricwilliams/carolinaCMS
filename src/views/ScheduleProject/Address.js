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
import { useState } from 'react';
import Stack from '@mui/material/Stack';
export default function AddressForm() {
  const [editMode, setEditMode] = React.useState(false);
  const [editModeNew, setEditModeNew] = React.useState(false);

  const [customer, setCustomer] = React.useState('');
  const [newCustomer, setNewCustomer] = React.useState(false);
  const [showCustomer, setShowCustomer] = useState(false);

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
  };
  const toggleEditModeNew = () => {
    setEditModeNew(!editModeNew);
  };
  const NewCustomerFunc = () => {
    setCustomer('');
    setNewCustomer(true);
    setShowCustomer(false);
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
