import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer,
  useMediaQuery,
  Modal,
  Grid,
  Paper,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Stack
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import { drawerWidth } from 'store/constant';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [recentActivities, setRecentActivities] = useState([
    { text: 'Completed mowing the lawn at the Johnson residence' },
    { text: 'Trimmed bushes and hedges at the Smith property' },
    { text: 'Installed new flower beds in the backyard of the Thompsons' },
    { text: 'Pruned trees in the park for the city council' }
  ]);
  const [newActivity, setNewActivity] = useState('');

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEditActivity = (activity) => {
    setSelectedActivity(activity);
    handleOpenModal();
  };

  const handleSaveEdit = () => {
    // Update the recent activities list with the edited activity
    setRecentActivities(
      recentActivities.map((activity) => (activity === selectedActivity ? { ...activity, text: selectedActivity.text } : activity))
    );
    setSelectedActivity(null);
    handleCloseModal();
  };

  const handleDeleteActivity = (activity) => {
    // Remove the selected activity from the recent activities list
    setRecentActivities(recentActivities.filter((act) => act !== activity));
  };

  const handleAddActivity = () => {
    if (newActivity.trim() !== '') {
      setRecentActivities([...recentActivities, { text: newActivity }]);
      setNewActivity('');
    }
  };

  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const drawer = (
    <>
      {/* Sidebar content */}
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
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">To Do List</Typography>
              {recentActivities.map((activity, index) => (
                <Box key={index}>
                  <List>
                    <ListItem>
                      <Stack direction="column">
                        <ListItemText primary={activity.text} />
                        <Button color="secondary" onClick={() => handleEditActivity(activity)}>
                          Edit
                        </Button>
                        <Button color="secondary" onClick={() => handleDeleteActivity(activity)}>
                          Delete
                        </Button>
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
      {/* Modal for editing activities */}
      <Modal open={modalOpen} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            maxWidth: '80vw',
            maxHeight: '80vh',
            overflow: 'auto'
          }}
        >
          {selectedActivity && (
            <>
              <Typography variant="h6" id="modal-title" gutterBottom>
                Edit Activity
              </Typography>
              <TextField
                id="edit-activity"
                label="Activity"
                multiline
                fullWidth
                rows={4}
                value={selectedActivity.text}
                onChange={(e) => setSelectedActivity({ ...selectedActivity, text: e.target.value })}
              />
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleSaveEdit}>
                  Save
                </Button>
                <Button variant="contained" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={() => handleDeleteActivity(selectedActivity)}>
                  Delete
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object
};

export default Sidebar;
