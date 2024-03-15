import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddressForm() {
  const [editMode, setEditMode] = React.useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Customer Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Full name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            defaultValue="Todd Chanslor"
            disabled={!editMode}
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
            defaultValue="(910) 222-3422"
            disabled={!editMode}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
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
          </Button>{' '}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
