import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { Grid, Paper, Button, Typography, List, ListItem, ListItemText, TextField, Stack } from '@mui/material';
// import { EditBTNStyle } from '../../../Util';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
// import MenuCard from './MenuCard';
import { drawerWidth } from 'store/constant';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const [recentActivities, setRecentActivities] = useState([
    { text: 'Completed mowing the lawn at the Johnson residence' },
    { text: 'Trimmed bushes and hedges at the Smith property' },
    { text: 'Installed new flower beds in the backyard of the Thompsons' },
    { text: 'Pruned trees in the park for the city council' }
  ]);
  const [newActivity, setNewActivity] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleAddActivity = () => {
    if (newActivity.trim() !== '') {
      setRecentActivities([...recentActivities, { text: newActivity }]);
      setNewActivity('');
    }
  };

  const handleDeleteActivity = (index) => {
    const updatedActivities = [...recentActivities];
    updatedActivities.splice(index, 1);
    setRecentActivities(updatedActivities);
  };

  const handleEditActivity = (index) => {
    setEditIndex(index);
    setEditedText(recentActivities[index].text);
  };

  const handleSaveEdit = () => {
    if (editedText.trim() !== '') {
      const updatedActivities = [...recentActivities];
      updatedActivities[editIndex].text = editedText;
      setRecentActivities(updatedActivities);
      setEditIndex(null);
    }
  };

  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const drawer = (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '16px',
            paddingRight: '16px'
          }}
        >
          <MenuList />
          {/* <MenuCard />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip label={process.env.REACT_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
          </Stack> */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">To Do List</Typography>
              {recentActivities.map((activity, index) => (
                <Box key={index}>
                  <List>
                    <ListItem>
                      <Stack direction="column">
                        {editIndex === index ? (
                          <>
                            <TextField value={editedText} onChange={(e) => setEditedText(e.target.value)} autoFocus />
                            <Button color="primary" onClick={handleSaveEdit}>
                              Save
                            </Button>
                          </>
                        ) : (
                          <>
                            <ListItemText primary={activity.text} />
                            <Button color="secondary" onClick={() => handleEditActivity(index)}>
                              Edit
                            </Button>
                            <Button color="secondary" onClick={() => handleDeleteActivity(index)}>
                              Delete
                            </Button>
                          </>
                        )}
                      </Stack>
                    </ListItem>
                  </List>
                </Box>
              ))}
              <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
              />
              <Button color="secondary" variant="contained" onClick={handleAddActivity}>
                Add
              </Button>
            </Paper>
          </Grid>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
          {/* <MenuCard />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip label={process.env.REACT_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
          </Stack> */}
        </Box>
      </MobileView>
    </>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: {
              top: '88px'
            }
          }
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object
};

export default Sidebar;
