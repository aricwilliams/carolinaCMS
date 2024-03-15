import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Customer Information
      </Typography>
      <Grid container spacing={3}>
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
            <TextField id="companyName" name="companyName" label="Tag" fullWidth autoComplete="family-name" variant="standard" />
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use company name for Primary Name?"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
