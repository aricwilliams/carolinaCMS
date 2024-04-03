import * as React from 'react';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// eslint-disable-next-line no-restricted-imports
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs'; // Import dayjs

export default function PropertyDetails() {
  return (
    <Grid container style={{ paddingTop: 0, marginTop: 0 }}>
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* <DatePicker /> */}
          <DemoContainer components={['StaticDatePicker']}>
            <DemoItem>
              <StaticDatePicker defaultValue={dayjs('2022-04-17')} />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}
