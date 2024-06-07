import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

export default function AddressForm({ formData, handleInputChange }) {
  const [tagValue, setTagValue] = useState('');
  const [tags, setTags] = useState(formData.tags || []);

  const isLessThan600 = useMediaQuery('(max-width:600px)');
  const handleTagChange = (event) => {
    setTagValue(event.target.value);
  };

  const handleTagSubmit = () => {
    if (tagValue.trim() !== '') {
      const updatedTags = [...tags, tagValue.trim()];
      setTags(updatedTags);
      setTagValue('');
      handleInputChange({ target: { name: 'tags', value: updatedTags } });
    }
  };

  const handleTagDelete = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
    handleInputChange({ target: { name: 'tags', value: updatedTags } });
  };

  const handleTagClick = (index) => {
    const editedTag = prompt('Edit Tag', tags[index]);
    if (editedTag !== null) {
      const updatedTags = [...tags];
      updatedTags[index] = editedTag.trim();
      setTags(updatedTags);
      handleInputChange({ target: { name: 'tags', value: updatedTags } });
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
            value={formData.firstName}
            onChange={handleInputChange}
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
            value={formData.lastName}
            onChange={handleInputChange}
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
            value={formData.cell}
            onChange={handleInputChange}
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
            value={formData.work}
            onChange={handleInputChange}
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
            value={formData.companyName}
            onChange={handleInputChange}
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
                onKeyPress={handleKeyPress}
              />
              <Button sx={{ mt: 1 }} variant="contained" onClick={handleTagSubmit}>
                Submit
              </Button>
            </>
          </Tooltip>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
