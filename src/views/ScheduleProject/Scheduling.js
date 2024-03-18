import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Calendar from 'react-calendar';

export default function PropertyDetails() {
  const [value, onChange] = useState(new Date());

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Property details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper square={false} elevation={3} sx={{ width: '100%', p: 3 }}>
            <Calendar onChange={onChange} value={value} />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
