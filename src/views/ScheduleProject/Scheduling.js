import * as React from 'react';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// eslint-disable-next-line no-restricted-imports
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs'; // Import dayjs
import { useState } from 'react';

export default function PropertyDetails({ setJobDate }) {
  // State to track the selected date
  const [selectedDate, setSelectedDate] = useState(dayjs('2022-04-17'));

  // Handle date change
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setJobDate(newDate.format('YYYY-MM-DD'));
    console.log('Selected date:', newDate.format('YYYY-MM-DD')); // Log the date in YYYY-MM-DD format
  };

  return (
    <Grid container style={{ paddingTop: 0, marginTop: 0 }}>
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['StaticDatePicker']}>
            <DemoItem>
              <StaticDatePicker
                value={selectedDate}
                onChange={handleDateChange} // Attach the handler to onChange
                componentsProps={{
                  actionBar: { actions: [] } // Remove Cancel and OK buttons
                }}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}
