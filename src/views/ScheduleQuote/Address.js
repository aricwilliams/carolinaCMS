import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import { useMediaQuery } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

export default function AddressForm() {
  const [tagValue, setTagValue] = useState('');
  const [tags, setTags] = useState([]);
  const [editMode, setEditMode] = React.useState(false);
  const isLessThan600 = useMediaQuery('(max-width:600px)');

  const toggleEditMode = () => {
    setEditMode(!editMode);
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
              <Button sx={{ mt: 1 }} variant="contained" onClick={handleTagSubmit}>
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
          <TextField id="state" name="state" label="State/Province/Region" fullWidth variant="standard" defaultValue="NC" />
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
          <Button variant="contained" onClick={toggleEditMode}>
            {editMode ? 'Save' : 'Change'}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
