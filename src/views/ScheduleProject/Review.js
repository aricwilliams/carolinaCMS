import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dropzone from 'react-dropzone';
import Button from '@mui/material/Button';
import axios from 'axios'; // To upload files to the backend or cloud storage

export default function Review({ setJobNotes }) {
  const [notes, setNotes] = React.useState(''); // State for notes
  const [uploadedImages, setUploadedImages] = React.useState([]); // State for uploaded images

  const handleDrop = async (acceptedFiles) => {
    const validImages = acceptedFiles.filter((file) => file.type.startsWith('image/'));
    if (validImages.length === 0) {
      console.error('Only images are allowed.');
      return;
    }

    validImages.forEach(async (file) => {
      console.log(file);

      // Example: Upload the file to a backend API
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('File uploaded successfully:', response.data);
        console.log('uploadedImages', uploadedImages);
        // Add uploaded file URL to state
        setUploadedImages((prev) => [...prev, response.data.fileUrl]);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    });
  };

  const handleNotesChange = (event) => {
    const inputValue = event.target.value;
    setNotes(inputValue); // Update state
    setJobNotes(inputValue);
    console.log('Notes:', inputValue); // Log notes to the console
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Add Images & Notes
      </Typography>

      <Box sx={{ mt: 2, border: '1px dashed #ccc', padding: '20px', textAlign: 'center' }}>
        <Dropzone
          onDrop={handleDrop}
          accept={{ 'image/*': [] }} // Restrict to images only
          maxFiles={5} // Optional: Limit the number of files
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Typography variant="body1">Drag images here or</Typography>
              <Button variant="contained" sx={{ mt: 3 }}>
                Select a file...
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
          sx={{ width: '100%' }}
          value={notes} // Bind state to TextField
          onChange={handleNotesChange} // Handle user input
        />
      </Grid>
    </React.Fragment>
  );
}
