import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dropzone from 'react-dropzone';
import Button from '@mui/material/Button';

export default function Review() {
  const handleDrop = (acceptedFiles) => {
    // Handle dropped files here
    console.log(acceptedFiles);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Add Attachments & Notes
      </Typography>

      <Box sx={{ mt: 2, border: '1px dashed #ccc', padding: '20px', textAlign: 'center' }}>
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Typography variant="body1">Drag files here or</Typography>
              <Button variant="contained" sx={{ mt: 3 }}>
                select a file...
              </Button>
            </div>
          )}
        </Dropzone>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <TextField
          id="outlined-multiline-static"
          label="Notes"
          multiline
          placeholder="Example: Customer will not speak with Joe"
          rows={8}
          sx={[{ width: '100%' }]}
        />
      </Grid>
    </React.Fragment>
  );
}
