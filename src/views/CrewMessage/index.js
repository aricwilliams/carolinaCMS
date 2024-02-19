import React from 'react';
import { Grid, Paper, Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



function CrewMessage() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const recentActivities = [
    { text: 'Completed mowing the lawn at the Johnson residence', time: '2 hours ago' },
    { text: 'Trimmed bushes and hedges at the Smith property', time: '3 hours ago' },
    { text: 'Installed new flower beds in the backyard of the Thompsons', time: '4 hours ago' },
    { text: 'Pruned trees in the park for the city council', time: '5 hours ago' },
    { text: 'Spread mulch in the garden beds at the Browns house', time: '6 hours ago' },
    { text: 'Cleaned up leaves and debris from the driveway at the Williams residence', time: '7 hours ago' },
    { text: 'Planted seasonal flowers in the front yard of the Davis family', time: '8 hours ago' },
    { text: 'Installed a new irrigation system for the Robinsons', time: '9 hours ago' },
    { text: 'Built a stone pathway in the garden for the Garcia household', time: '10 hours ago' },
    { text: 'Fertilized the lawn at the Miller property', time: '11 hours ago' }
  ];

  const messages = [
    { id: 1, sender: 'John Doe', text: 'Hey, how are you?', time: '10:00 AM' },
    { id: 2, sender: 'Jane Smith', text: 'I\'m good, thanks! How about you?', time: '10:05 AM' },
    { id: 3, sender: 'John Doe', text: 'I\'m doing great, thanks for asking!', time: '10:10 AM' },
    { id: 4, sender: 'Jane Smith', text: 'That\'s good to hear!', time: '10:15 AM' },
    // Add more messages as needed
  ];
  
  return (
    <>
       
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
        

        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
                <Tab value={0} label="Messages" wrapped />
                <Tab value={1} label="Photos" />
                <Tab value={2} label="Teams" />
              </Tabs>
              <TabPanel value={value} index={0}>
              <Typography variant="h6">Messages</Typography>
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {messages.map((message) => (
              <React.Fragment key={message.id}>
                <ListItem alignItems="flex-start">
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{message.sender[0]}</Avatar>
                  <ListItemText
                    primary={message.sender}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline', fontWeight: 'bold' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {message.text}
                        </Typography>
                        <Typography
                          sx={{ display: 'inline', ml: 1 }}
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          - {message.time}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
              </TabPanel>
              <TabPanel value={value} index={1}>
              <Typography variant="h6">My photos</Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>PH</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Photo 1" secondary="July 2023" />
                </ListItem>
                {/* Add more items as needed */}
              </List>              </TabPanel>
              <TabPanel value={value} index={2}>
   {/* Content for Tab One */}
   <Typography variant="h6">Friends</Typography>
                <Typography variant="subtitle1">1</Typography>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant="h6">Groups</Typography>
                <Typography variant="subtitle1">3</Typography>
                {/* Add more items as needed */}              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Box>


            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                {recentActivities.map((activity, index) => (
                  <Box key={index}>
                    <Typography variant="h6">Recent activity</Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary={activity.text} secondary={activity.time} />
                      </ListItem>
                    </List>
                  </Box>
                ))}
              </Paper>
            </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default CrewMessage;
